<template>
    <v-data-table
        :headers="props.headers"
        :items="state.currentItems"
        :page="state.page"
        :items-per-page="state.perPage"
        :server-items-length="props.items.length"
        class="elevation-1"
        loading-text="読み込み中..."
        @update:page="pagination"
        @update:items-per-page="updateItemsPerPage"
    >
        <template v-slot:top>
            <slot name="top" />
        </template>
        <template v-slot:item.name="{ item }">
            <slot v-bind:item="item">
                {{ concatNameObj(item) }}
            </slot>
        </template>
        <template v-slot:item.nameRuby="{ item }">
            <slot v-bind:item="item">
                {{ concatNameRubyObj(item) }}
            </slot>
        </template>
        <template v-slot:item.occupations="{ item }">
            <span v-if="item.occupations && item.occupations.length">
                <BeauticianOccupations
                    :occupationIds="
                        item.occupations.map((item) =>
                            item.occupationId.toString()
                        )
                    "
                />
            </span>
            <span v-else>-</span>
        </template>
        <template v-slot:item.salons="{ item }">
            <ShowBeauticianSalon :salons="item.salons" />
        </template>
        <template v-slot:item.memberType="{ item }">
            {{ getMemberTypeName(item) }}
        </template>
        <template v-slot:item.action="{ item }">
            <ActionsIndex
                :item="item"
                :has-detail-page="false"
                :can-delete="!readonly"
                @delete="deleteItem"
            />
        </template>
    </v-data-table>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from '@vue/composition-api'
import {
    concatNameObj,
    concatNameRubyObj,
    getPriorityMemberTypeId,
} from '@/util'
import { BeauticianSummary } from '@/api'
import { injectMasterData } from '@/components/providers/InjectHelper'
import BeauticianOccupations from '@/components/molecules/BeauticianOccupations.vue'

type Props = {
    headers: []
    items: EntityHasId[]
}

export default defineComponent({
    model: {
        prop: 'items',
    },
    components: {
        BeauticianOccupations,
    },
    props: {
        headers: {
            type: Array,
            required: true,
        },
        items: {
            type: Array,
            required: true,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
    },
    setup(props: Props, context) {
        const { enumerations } = injectMasterData()

        const state: {
            page: number
            perPage: number
        } = reactive({
            page: 1,
            perPage: 10,
            currentItems: computed(() => {
                const from = (state.page - 1) * state.perPage
                const to = from + state.perPage
                return props.items.slice(from, to)
            }),
        })

        function pagination(page: number) {
            state.page = page
        }

        function updateItemsPerPage(perPage: number) {
            state.perPage = perPage
            // リセット
            state.page = 1
        }

        function deleteItem(id: number) {
            context.emit(
                'input',
                props.items.filter((o) => o.id !== id)
            )
        }

        function getMemberTypeName(item: BeauticianSummary) {
            const none = '-'
            let salons = item.salons
            const mid = getPriorityMemberTypeId(salons)
            if (mid) {
                return enumerations.memberType.labelById('' + mid) || none
            } else {
                return none
            }
        }

        return {
            props,
            state,
            pagination,
            updateItemsPerPage,
            deleteItem,
            concatNameObj,
            concatNameRubyObj,
            getMemberTypeName,
        }
    },
})
</script>
