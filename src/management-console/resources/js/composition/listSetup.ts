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
import { clickDownload } from '@/util'

type Header = {
    text: string
    value: string
    sortable?: boolean
    width?: string
}

export default function listSetup<EntitySummary extends EntityHasId = any>(
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
    })

    onBeforeMount(() => {
        restorePageCondition()
    })

    onMounted(() => {
        model.initFetchCondition({
            state,
            nameSpace: context.root.$route.name || '',
        })
    })

    function restorePageCondition() {
        if (props.isSelector) {
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
            const { data, total } = await model.fetchIndex({
                state,
                props,
            })
            state.items = data
            state.total = total
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
        align: 'left',
        sortable: h.sortable || false,
        value: h.value,
        width: h.width || undefined,
    }))

    async function downloadAttachment({ id, name }: ExistsFile) {
        const url = await model.getAttachmentUrl(id)
        clickDownload(url, name)
    }

    return {
        state,
        props,
        fetch,
        pagination,
        updateItemsPerPage,
        deleteItem,
        downloadAttachment,
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
