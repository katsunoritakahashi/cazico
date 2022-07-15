import {
    injectAuth,
    injectDialog,
    injectLeaveGuard,
    injectMasterData,
    injectNotification,
} from '@/components/providers/InjectHelper'
import { onBeforeMount, reactive, SetupContext } from '@vue/composition-api'
import DirtyChecker from '@/lib/DirtyChecker'
import Model from '@/models/Model'
import { httpErrorHandler } from '@/api/client'
import { clickDownload } from '@/util'

type UpdateOptions = {
    targetId?: string
    notifyMessage?: string
}

export default function showSetup<Update extends EntityHasId = any>(
    model: Model<any, any, any, any, any>,
    props: any,
    context: SetupContext
) {
    const progress: ProgressState = {
        fetch: false,
        fetched: false,
        post: false,
        targetId: null,
    }

    const auth = injectAuth()
    const dialog = injectDialog()
    const { masters, enumerations } = injectMasterData()
    const notification = injectNotification()
    const leaveGuard = injectLeaveGuard()
    const dirtyChecker = new DirtyChecker()

    const errorDetails: { [key: string]: Array<string> } = {}

    const entity: Update = model.initUpdateState(props)
    const state = reactive({
        progress,
        entity,
        errorDetails,
    })

    onBeforeMount(() => {
        fetch()
    })

    async function fetch() {
        state.progress.fetch = true
        try {
            const entity = await model.fetch({ state, props })
            Object.assign(state.entity, entity)
            if (model.canUpdate(auth.me)) {
                dirtyChecker.init(entity, state.entity)
            }
            state.progress.fetched = true
        } catch (e) {
            const { errorMessage } = httpErrorHandler(e)
            notification.notifyMessage({ message: errorMessage, type: 'error' })
        } finally {
            state.progress.fetch = false
        }
    }

    async function updateWithOptions(updateOptions: UpdateOptions) {
        return _update(updateOptions)
    }

    function update() {
        return _update()
    }

    async function _update(options: UpdateOptions = {}) {
        state.errorDetails = {}

        if (options.targetId) {
            state.progress.targetId = options.targetId
        } else {
            state.progress.post = true
        }

        const updateRequestParam = model.buildUpdateRequest({
            state: state.entity as Update,
            props,
        })
        try {
            await model.update({ updateRequestParam, props })

            notification.notifyMessage({
                message: options.notifyMessage || '更新しました',
                type: 'success',
            })
            dirtyChecker.reset(state.entity)
            leaveGuard.off()
            return { failed: false, succeeded: true }
        } catch (e) {
            const { errorMessage, errorDetails } = httpErrorHandler(e)
            state.errorDetails = errorDetails
            notification.notifyMessage({ message: errorMessage, type: 'error' })
            return { failed: true, succeeded: false }
        } finally {
            if (options.targetId) {
                state.progress.targetId = null
            } else {
                state.progress.post = false
            }
        }
    }

    function deleteItem(
        toRouteName: string | { name: string; params: any },
        msg: string = '本当に削除しますか？',
        opt: any = {}
    ) {
        dialog.show(
            msg,
            async () => {
                state.progress.targetId = 'delete'
                try {
                    await model.delete({ id: state.entity.id, props })
                    notification.notifyMessage({
                        message: '削除しました',
                        type: 'success',
                    })

                    if (typeof toRouteName === 'string') {
                        await context.root.$router.push({ name: toRouteName })
                    } else {
                        await context.root.$router.push(toRouteName)
                    }
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
            { buttonColor: 'error', ...opt }
        )
    }

    async function downloadAttachment({ id, name }: ExistsFile) {
        const url = await model.getAttachmentUrl(id)
        clickDownload(url, name)
    }

    return {
        i: auth.me,
        state,
        update,
        updateWithOptions,
        fetch,
        downloadAttachment,
        dirtyChecker,
        masters,
        enumerations,
        notification,
        deleteItem,
        guardLeave: leaveGuard.on(() => dirtyChecker.someDirty()),
    }
}
