import {
    injectLeaveGuard,
    injectNotification,
} from '@/components/providers/InjectHelper'
import { reactive } from '@vue/composition-api'
import { httpErrorHandler } from '@/api/client'
import DirtyChecker from '@/lib/DirtyChecker'
import Model from '@/models/Model'
import { SetupContext } from '@vue/composition-api/dist/component/component'
import { clickDownload } from '@/util'

type CreateOptions = {
    targetId?: string
}

export default function createSetup<Create>(
    model: Model<any, EntityHasId, any, any, any>,
    props: any,
    context: SetupContext
) {
    const progress: ProgressState = {
        post: false,
    }
    const notification = injectNotification()
    const leaveGuard = injectLeaveGuard()
    const dirtyChecker = new DirtyChecker()

    const errorDetails: { [key: string]: Array<string> | object } = {}

    const entity: Create = model.initCreateState(props)
    const state = reactive({
        progress,
        entity,
        errorDetails,
    })
    dirtyChecker.init(entity, state.entity)

    async function createWithProgressTarget(targetId: string) {
        return _create({ targetId })
    }

    function create() {
        return _create()
    }

    async function _create(options: CreateOptions = {}) {
        state.errorDetails = {}

        if (options.targetId) {
            state.progress.targetId = options.targetId
        } else {
            state.progress.post = true
        }

        const requestParams = model.buildCreateRequest({
            state: state.entity,
            props,
        })

        try {
            const createdEntity = await model.create({
                createRequestParam: requestParams,
                props,
            })

            notification.notifyMessage({
                message: '登録しました',
                type: 'success',
            })
            leaveGuard.off()
            await context.root.$router.push(
                model.goToAfterCreate(createdEntity)
            )

            return createdEntity
        } catch (e) {
            const { errorMessage, errorDetails } = httpErrorHandler(e)
            state.errorDetails = errorDetails
            notification.notifyMessage({ message: errorMessage, type: 'error' })
        } finally {
            if (options.targetId) {
                state.progress.targetId = null
            } else {
                state.progress.post = false
            }
        }
    }

    async function downloadAttachment({ id, name }: ExistsFile) {
        const url = await model.getAttachmentUrl(id)
        clickDownload(url, name)
    }

    return {
        state,
        create,
        createWithProgressTarget,
        downloadAttachment,
        guardLeave: leaveGuard.on(() => dirtyChecker.someDirty()),
    }
}
