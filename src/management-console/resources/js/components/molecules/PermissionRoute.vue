<template>
    <component :is="canRead ? 'router-link' : 'span'" :to="to"
        ><slot
    /></component>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    props: {
        canRead: {
            type: Boolean,
            required: true,
        },
        to: {
            type: Object,
            default: false,
        },
    },
    setup(props) {
        return {
            props,
        }
    },
})
</script>
