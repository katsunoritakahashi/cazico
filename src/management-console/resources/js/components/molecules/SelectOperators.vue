<template>
    <v-select
        item-text="displayName"
        item-value="id"
        :items="state.allOperators"
        :value="props.value"
        :loading="state.fetch"
        :label="label"
        @change="$emit('input', $event)"
        clearable
        :error-messages="props.errorMessages"
    />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from '@vue/composition-api'
import { OperatorSummary } from '@/api/api'
import OperatorModel from '@/models/OperatorModel'

type Props = {
    value: number | null
}

export default defineComponent({
    name: 'SelectOperator',
    props: {
        value: Number,
        label: {
            type: String,
            default: '担当者',
        },
        errorMessages: {
            type: Array,
            default: () => [],
        },
    },
    setup(props: Props) {
        let allOperators: OperatorSummary[] = []
        const state = reactive({
            fetch: false,
            allOperators,
        })

        onMounted(async () => {
            state.fetch = true
            state.allOperators = await OperatorModel.getAllOperators()
            state.fetch = false
        })

        return {
            props,
            state,
        }
    },
})
</script>
