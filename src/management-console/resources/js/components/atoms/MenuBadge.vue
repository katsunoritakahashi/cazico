<template>
    <v-badge color="error" :content="props.content" :value="!!props.content">
        <slot />
    </v-badge>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

type Props = {
    content: {
        type: number
        required: false
    }
}

export default defineComponent({
    name: 'MenuBadge',
    props: {
        content: Number,
        loading: Boolean,
    },
    setup(props: Props) {
        return {
            props,
        }
    },
})
</script>
