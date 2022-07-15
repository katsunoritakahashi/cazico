<template>
    <v-text-field
        v-bind="$attrs"
        :value="props.value"
        @input="$emit('input', $event)"
        :append-icon="state.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="state.showPassword = !state.showPassword"
        :type="state.showPassword ? 'text' : 'password'"
        prepend-icon="mdi-lock"
    />
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
    props: {
        value: String,
    },
    setup(props) {
        const state = reactive({
            showPassword: false,
        })

        return {
            props,
            state,
        }
    },
})
</script>
