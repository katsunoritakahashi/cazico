<template>
    <component :is="props.dirty ? 'v-badge' : 'span'" color="red" dot left>
        <slot />
    </component>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { VBadge } from 'vuetify/lib'

type Props = {
    dirty: boolean
}

export default defineComponent({
    name: 'DirtyBadge',
    props: {
        dirty: {
            default: false,
            type: Boolean,
        },
    },
    components: {
        VBadge,
    },
    setup(props: Props) {
        return {
            props,
        }
    },
})
</script>
