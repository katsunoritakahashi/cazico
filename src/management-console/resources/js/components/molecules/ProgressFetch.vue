<template>
    <v-row justify="center" class="mt-10">
        <v-progress-circular
            v-show="props.progress.fetch && !props.progress.fetched"
            indeterminate
            color="primary"
        />
    </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
type Props = {
    progress: { fetch: boolean; fetched: boolean }
}

export default defineComponent({
    props: {
        progress: {
            type: Object,
        },
    },
    setup(props: Props) {
        return { props }
    },
})
</script>
