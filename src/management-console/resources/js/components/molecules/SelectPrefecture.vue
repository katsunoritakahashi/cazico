<template>
    <v-select
        item-text="name"
        item-value="id"
        :items="masters.prefectures"
        :value="props.value"
        @change="$emit('input', $event)"
        label="都道府県"
        :clearable="!props.readonly"
        :readonly="props.readonly"
        :filled="props.readonly"
        :error-messages="props.errorMessages"
    />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { injectMasterData } from '@/components/providers/InjectHelper'

type Props = {
    value: number | null
    errorMessages?: string[]
}

export default defineComponent({
    name: 'SelectPrefecture',
    props: {
        value: Number,
        readonly: Boolean,
        errorMessages: {
            type: Array,
            default: () => [],
        },
    },
    setup(props: Props) {
        const { masters } = injectMasterData()

        return {
            props,
            masters,
        }
    },
})
</script>
