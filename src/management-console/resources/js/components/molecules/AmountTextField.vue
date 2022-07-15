<template>
    <v-text-field
        v-model="innerValue"
        :readonly="props.readonly"
        :label="props.label"
        :filled="props.readonly"
        :clearable="!props.readonly"
        :suffix="props.suffix"
    />
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

type Props = {
    value: number | null
    label?: string
    readonly?: boolean
    suffix?: string
}

export default defineComponent({
    name: 'AmountTextField',
    props: {
        value: Number,
        label: String,
        readonly: Boolean,
        suffix: {
            type: String,
            default: '円',
        },
    },
    setup(props: Props, context) {
        const innerValue = computed({
            get: () => {
                if (props.value == null) return
                return props.readonly
                    ? props.value.toLocaleString()
                    : props.value.toString()
            },
            set: (newValue) => {
                const value = Number(newValue)
                context.emit('input', Number.isNaN(value) ? null : value)
            },
        })

        return {
            props,
            innerValue,
        }
    },
})
</script>
