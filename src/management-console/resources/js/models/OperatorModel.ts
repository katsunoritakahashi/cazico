import {
    Operator,
    OperatorCreateRequest,
    OperatorIndexAllResponse,
    OperatorIndexResponse,
    OperatorMutable,
    OperatorResponse,
    OperatorSummary,
    OperatorUpdateRequest,
} from '@/api'
import { AxiosResponse } from 'axios'
import client from '@/api/client'
import sessionStorageSynchronizer from '@/lib/sessionStorageSynchronizer'
import ModelDefault from '@/models/ModelDefault'

type CreateProps = {}

type ShowProps = {
    id: number
}

type OperatorFilterConditions = {
    id: number
    name: string
    displayName: string
    email: string
    createdAt: string
}

class OperatorModel extends ModelDefault<
    Operator,
    OperatorSummary,
    OperatorCreateRequest,
    OperatorUpdateRequest,
    OperatorResponse
> {
    constructor() {
        super()
        this.routeAfterCreate = 'operator.show'
    }

    initCreateState(props: CreateProps): OperatorCreateRequest {
        return {
            ...initMutable(),
            password: '',
            ...props,
        }
    }

    initUpdateState(props: ShowProps): OperatorUpdateRequest {
        return {
            ...initMutable(),
            ...props,
        }
    }

    async fetch({ props }: { props: any }): Promise<Operator> {
        const response: AxiosResponse<OperatorResponse> = await client.getOperatorsId(
            props.id
        )

        let salons: number[] = []
        if (response.data.data.operatorSalons) {
            for (let salon of response.data.data.operatorSalons) {
                if (salon.salonId !== undefined) {
                    salons.push(salon.salonId)
                }
            }
        }

        return {
            ...response.data.data,
        }
    }

    initFetchCondition({
        state,
        nameSpace,
    }: {
        state: { filterConditions: OperatorFilterConditions }
        nameSpace: string
    }) {
        state.filterConditions = {
            id: undefined!,
            name: '',
            displayName: '',
            email: '',
            createdAt: '',
        }

        sessionStorageSynchronizer(
            state,
            [
                { key: 'filterConditions.id', type: Number },
                { key: 'filterConditions.name', type: String },
                { key: 'filterConditions.displayName', type: String },
                { key: 'filterConditions.email', type: String },
                { key: 'filterConditions.createdAt', type: String },
            ],
            nameSpace
        )
    }

    async fetchIndex({
        state,
    }: {
        state: {
            page: number
            perPage: number
            filterConditions: OperatorFilterConditions
        }
    }): Promise<{ total: number; data: Array<OperatorSummary> }> {
        const response: AxiosResponse<OperatorIndexResponse> = await client.getOperators(
            state.page,
            state.perPage,
            state.filterConditions.id,
            state.filterConditions.name,
            state.filterConditions.displayName,
            state.filterConditions.email,
            state.filterConditions.createdAt || undefined
        )

        return { data: response.data.data, total: response.data.meta.total }
    }

    async create({
        createRequestParam,
    }: {
        createRequestParam: OperatorCreateRequest
    }): Promise<Operator> {
        const response: AxiosResponse<OperatorResponse> = await client.createOperator(
            createRequestParam
        )
        return response.data.data
    }

    async update({
        updateRequestParam,
        props,
    }: {
        updateRequestParam: OperatorUpdateRequest
        props: ShowProps
    }): Promise<Operator> {
        const response: AxiosResponse<OperatorResponse> = await client.putOperatorsId(
            props.id,
            updateRequestParam
        )
        return response.data.data
    }

    canUpdate(i: Operator): boolean {
        return i.canOperatorUpdate
    }

    async delete({ id }: { id: number }) {
        await client.deleteOperatorsId(id)
    }

    async getAllOperators(): Promise<Array<OperatorSummary>> {
        const response: AxiosResponse<OperatorIndexAllResponse> = await client.getOperatorsAll()

        return response.data.data
    }
}

function initMutable(): OperatorMutable {
    return {
        email: '',
        displayName: '',
        name: '',
        canOperatorRead: false,
        canOperatorExport: false,
        canOperatorUpdate: false,
        canOperatorDelete: false,
    }
}

export function operatorDefault(): Operator {
    return {
        id: undefined!,
        email: '',
        name: '',
        displayName: '',
        locked: false,
        canOperatorRead: false,
        canOperatorExport: false,
        canOperatorUpdate: false,
        canOperatorDelete: false,
    }
}

export default new OperatorModel()
