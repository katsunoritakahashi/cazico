<template>
    <v-autocomplete
        item-text="name"
        item-value="id"
        :items="state.candidates"
        :value="props.value"
        :loading="state.fetch"
        :clearable="!props.readonly"
        :readonly="props.readonly"
        :filled="props.readonly"
        @change="$emit('input', $event)"
        label="市区町村"
        :no-data-text="
            props.prefectureId == null
                ? '都道府県を選択してください'
                : 'データはありません。'
        "
    />
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from '@vue/composition-api'
import client from '@/api/client'
import { City } from '@/api/api'

type Props = {
    value: number | null
    prefectureId: number | null
}

export default defineComponent({
    name: 'SelectCity',
    props: {
        value: Number,
        readonly: Boolean,
        prefectureId: Number,
    },
    setup(props: Props) {
        const candidates: City[] = []

        const state = reactive({
            fetch: false,
            candidates,
        })

        watch(
            () => props.prefectureId,
            async () => {
                if (props.prefectureId != null) {
                    state.fetch = true
                    state.candidates = []
                    try {
                        const { data } = await client.getCities(
                            props.prefectureId
                        )
                        state.candidates = data.data
                    } catch (e) {
                    } finally {
                        state.fetch = false
                    }
                } else {
                    state.candidates = []
                }
            }
        )

        return {
            props,
            state,
        }
    },
})
</script>
