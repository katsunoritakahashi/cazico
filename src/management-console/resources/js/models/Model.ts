import { RawLocation } from 'vue-router/types/router'
import { Operator } from '@/api'

export default interface Model<
    Entity extends EntityHasId,
    EntitySummary extends EntityHasId,
    Create,
    Update,
    Response
> {
    routeAfterCreate: string

    initCreateState: (props?: any) => Create
    initUpdateState: (props?: any) => Update

    buildCreateRequest: ({
        state,
        props,
    }: {
        state: Create
        props: any
    }) => Create

    create: ({
        createRequestParam,
        props,
    }: {
        createRequestParam: Create
        props: any
    }) => Promise<Entity>

    goToAfterCreate: (createdEntity: Entity) => RawLocation

    fetch: ({ state, props }: { state: any; props: any }) => Promise<Entity>

    initFetchCondition: ({
        state,
        nameSpace,
    }: {
        state: any
        nameSpace: string
    }) => void

    fetchIndex: ({
        state,
        props,
    }: {
        state: any
        props: any
    }) => Promise<{ total: number; data: Array<EntitySummary>; meta?: any }>

    buildUpdateRequest: ({
        state,
        props,
    }: {
        state: Update
        props: any
    }) => Update

    update: ({
        updateRequestParam,
        props,
    }: {
        updateRequestParam: Update
        props: any
    }) => Promise<Entity>

    canUpdate(i: Operator): boolean

    delete: ({ id, props }: { id: number; props: any }) => Promise<any>

    // addAttachments: (
    //   id: number,
    //   uploadFiles: UploadFile[],
    //   endpoint: string
    // ) => void
    getAttachmentUrl: (id: number) => Promise<string>
}
