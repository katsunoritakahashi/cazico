import Model from '@/models/Model'
import { SetupContext } from '@vue/composition-api/dist/component/component'
import {
    injectAuth,
    injectNotification,
    injectDialog,
    injectMasterData,
} from '@/components/providers/InjectHelper'
import { onBeforeMount, onMounted, reactive, watch } from '@vue/composition-api'
import { httpErrorHandler } from '@/api/client'
import { clickDownload, downloadData, attrIfHas } from '@/util'
import sessionStorageSynchronizer from '@/lib/sessionStorageSynchronizer'
import { format } from 'date-fns'
import iconv from 'iconv-lite'

type Header = {
    text: string
    value: string
    sortable?: boolean
    width?: string
    align?: string
}

export default function indexSetup<EntitySummary extends EntityHasId = any>(
    model: Model<any, any, any, any, any>,
    props: any,
    context: SetupContext,
    headers: Header[]
) {
    const progress: ProgressState = {
        fetch: false,
        targetId: null,
    }
    const auth = injectAuth()
    const { masters, enumerations } = injectMasterData()
    const notification = injectNotification()
    const dialog = injectDialog()

    const items: EntitySummary[] = []
    let filterConditions: any = {}
    const state = reactive({
        progress,
        page: 1,
        perPage: 10,
        total: 0,
        items,
        filterConditions,
        selected: null,
        order: '',
        meta: {} as any,
    })

    onBeforeMount(() => {
        restorePageCondition()
        sessionStorageSynchronizer(
            state,
            [{ key: 'perPage', type: Number }],
            context.root.$route.name || ''
        )
        fetch()
    })

    onMounted(() => {
        model.initFetchCondition({
            state,
            nameSpace: context.root.$route.name || '',
        })
    })

    function restorePageCondition() {
        if (props.noUsePageQuery) {
            // page 番号を復元しない。
        } else if (props.isSelector) {
            state.page =
                typeof context.root.$route.query.selectorPage === 'string'
                    ? parseInt(context.root.$route.query.selectorPage)
                    : 1
        } else {
            state.page =
                typeof context.root.$route.query.page === 'string'
                    ? parseInt(context.root.$route.query.page)
                    : 1
        }
    }

    async function fetch() {
        state.items = []
        await context.root.$nextTick()
        state.progress.fetch = true
        try {
            const { data, total, ...rest } = await model.fetchIndex({
                state,
                props,
            })
            state.items = data
            state.total = total
            state.meta = rest.meta
        } catch (e) {
            const { errorMessage } = httpErrorHandler(e)
            notification.notifyMessage({ message: errorMessage, type: 'error' })
        } finally {
            state.progress.fetch = false
        }
    }

    async function pagination(page: number) {
        // ページネーションによりページ番号が変更されたら履歴保存
        if (state.page !== page) {
            state.page = page
            if (!props.noUsePageQuery) {
                await context.root.$router.replace({
                    name: context.root.$route.name,
                    query: {
                        ...context.root.$route.query,
                        [props.isSelector
                            ? 'selectorPage'
                            : 'page']: page.toString(),
                    },
                })
            }
        }
        await fetch()
    }

    async function updateItemsPerPage(perPage: number) {
        state.perPage = perPage
        // リセット
        state.page = 1
        fetch()
    }

    function deleteItem(id: number) {
        dialog.show(
            '本当に削除しますか？',
            async () => {
                state.progress.targetId = id
                try {
                    await model.delete({ id, props })
                    notification.notifyMessage({
                        message: '削除しました',
                        type: 'success',
                    })

                    state.items = state.items.filter((i) => i.id !== id)
                    state.total -= 1
                } catch (e) {
                    const { errorMessage } = httpErrorHandler(e)
                    notification.notifyMessage({
                        message: errorMessage,
                        type: 'error',
                    })
                } finally {
                    state.progress.targetId = null
                }
            },
            { buttonColor: 'error' }
        )
    }

    watch(
        () => context.root.$route,
        () => {
            restorePageCondition()
        }
    )

    function search() {
        state.page = 1
        fetch()
    }

    const buildHeaders = headers.map((h) => ({
        text: h.text,
        align: h.align || 'left',
        sortable: h.sortable || false,
        value: h.value,
        width: h.width || undefined,
    }))

    async function downloadAttachment({ id, name }: ExistsFile) {
        const url = await model.getAttachmentUrl(id)
        clickDownload(url, name)
    }

    const fetchAllData = async () => {
        await context.root.$nextTick()
        state.progress.fetch = true
        try {
            const { total } = await model.fetchIndex({
                state: { ...state, page: 1, perPage: 1 },
                props,
            })

            // 取得上限
            const upperLimit = 5000
            if (total > upperLimit) {
                notification.notifyMessage({
                    message:
                        'エクスポート上限を超えています。検索条件で絞り込んで下さい.',
                    type: 'error',
                })
                return null
            }
            const { data } = await model.fetchIndex({
                state: { ...state, page: 1, perPage: upperLimit },
                props,
            })
            return data
        } catch (e) {
            const { errorMessage } = httpErrorHandler(e)
            notification.notifyMessage({ message: errorMessage, type: 'error' })
        } finally {
            state.progress.fetch = false
        }
    }

    async function downloadCsv(filenameBase: string, outputColumns: any[]) {
        // 出力対象データ
        const items = await fetchAllData()
        if (items === null || items === undefined) {
            return
        }

        // ユーティリティ関数
        const escapeForCsv = (x: any) => {
            if (x === null || x === undefined) {
                return ''
            }
            if (typeof x !== 'string') {
                return x
            }
            x = x as string
            if (
                x.indexOf(',') === -1 &&
                x.indexOf('\n') === -1 &&
                x.indexOf('"') === -1
            ) {
                return x
            }
            return `"${x.replaceAll('"', '""')}"`
        }

        // ヘッダー
        const outputHeader = outputColumns.map((colinfo) => {
            return escapeForCsv(colinfo.text)
        })
        // 列定義に従って、出力に変換する
        const outputConvs = outputColumns.map((colinfo) => {
            const col = colinfo.value
            if (typeof col === 'string') {
                return (item: any) => attrIfHas(item, col)
            } else if (typeof col === 'function') {
                return col
            } else {
                return (_item: any) => ''
            }
        })
        const listData = [
            outputHeader,
            ...items.map((item) => {
                const l = outputConvs.map((col) => {
                    const val = col(item)
                    return val
                })
                return l.map((x) => escapeForCsv(x)).join(',')
            }),
        ].join('\n')
        const downloadSize = items.length
        const filename =
            filenameBase + '_' + format(new Date(), 'yyyy-MM-dd_HH-mm') + '.csv'
        const encodedListData = iconv.encode(listData, 'CP932')
        downloadData(encodedListData, filename, 'text/plain')
        notification.notifyMessage({
            message: `${downloadSize}件のデータをダウンロードしました。`,
        })
    }

    return {
        state,
        props,
        fetch,
        pagination,
        updateItemsPerPage,
        deleteItem,
        downloadAttachment,
        downloadCsv,
        search,
        i: auth.me,
        masters,
        enumerations,
        tableSettingDefault: {
            headers: buildHeaders,
            page: state.page,
            itemsPerPage: state.perPage,
            footerProps: {
                itemsPerPageOptions: [5, 10, 20, 50, 100],
                showFirstLastPage: true,
            },
            loadingText: '読み込み中...',
            class: 'elevation-1',
        },
    }
}
