<template>
    <v-card
        outlined
        raised
        class="page-header white--text"
        min-height="120px"
        :color="props.headerColor"
    >
        <div class="title mb-2">
            <slot name="title" />
        </div>
        <div class="subtitle-2">
            <Breadcrumbs />
        </div>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Breadcrumbs from '@/components/organisms/Breadcrumbs.vue'

export default defineComponent({
    props: {
        headerColor: {
            type: String,
            default: 'primary',
        },
    },
    components: {
        Breadcrumbs,
    },
    setup(props) {
        return {
            props,
        }
    },
})
</script>

<style lang="scss">
.page-header {
    margin: 20px 20px 0 20px;
    position: relative;
    top: -20px;
    padding: 20px;
}
</style>
