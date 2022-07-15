import Model from '@/models/Model'
import { RawLocation } from 'vue-router/types/router'
// import { AxiosResponse } from 'axios'
// import { AttachmentResponse, Operator } from '@/api'
import { Operator } from '@/api'
// import manualClient from '@/api/manual-client'

export default abstract class ModelDefault<
    Entity extends EntityHasId,
    EntitySummary extends EntityHasId,
    Create,
    Update,
    Response
> implements Model<Entity, EntitySummary, Create, Update, Response> {
    routeAfterCreate = ''

    buildCreateRequest({ state }: { state: Create }): Create {
        return state
    }

    buildUpdateRequest({ state }: { state: Update }): Update {
        return state!
    }

    goToAfterCreate(createdEntity: Entity): RawLocation {
        return {
            name: this.routeAfterCreate,
            params: { id: createdEntity.id.toString() },
        }
    }

    create(_: {}): Promise<Entity> {
        console.warn('no implements create method.')
        return Promise.resolve(undefined!)
    }

    delete(_: any): Promise<any> {
        console.warn('no implements delete method.')
        return Promise.resolve(undefined!)
    }

    fetch(_: {}): Promise<Entity> {
        console.warn('no implements fetch method.')
        return Promise.resolve(undefined!)
    }

    fetchIndex(_: {}): Promise<{
        total: number
        data: Array<EntitySummary>
        meta?: any
    }> {
        return Promise.resolve({ data: undefined!, total: 0 })
    }

    initCreateState(_?: any): Create {
        return undefined!
    }

    initUpdateState(_?: any): Update {
        return undefined!
    }

    initFetchCondition(_: {}): void {}

    update(_: {}): Promise<Entity> {
        return Promise.resolve(undefined!)
    }

    getAttachmentUrl(_: number): Promise<string> {
        return Promise.resolve('')
    }

    // async addAttachments(
    //   id: number,
    //   uploadFiles: UploadFile[],
    //   endpoint: string
    // ) {
    //   const {
    //     data,
    //   }: AxiosResponse<AttachmentResponse> = await manualClient.uploadFile({
    //     endpoint: `${endpoint}/${id}/attachments`,
    //     files: uploadFiles.map((f) => f.blob),
    //     params: {},
    //   })

    //   return data.data
    // }

    canUpdate(_: Operator): boolean {
        return true
    }
}
