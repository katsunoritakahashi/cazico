<template>
    <div>
        <div
            v-for="(message, index) in props.errorMessages"
            :key="index"
            class="v-messages theme--light error--text"
            role="alert"
        >
            {{ message }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    props: {
        errorMessages: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        return {
            props,
        }
    },
})
</script>
