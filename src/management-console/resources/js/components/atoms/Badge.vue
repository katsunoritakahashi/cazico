<template>
    <div :class="['badge', { loading }]">
        <template v-if="loading">
            <v-progress-circular
                :size="20"
                :width="2"
                indeterminate
                color="primary"
            />
        </template>
        <template v-else-if="content > 0">
            {{ content }}
        </template>
    </div>
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
    name: 'Badge',
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

<style lang="scss" scoped>
.badge {
    width: 35px;
    line-height: 35px;
    border-radius: 100%;
    background: red;
    color: white;
    position: absolute;
    right: 15%;
    top: 15%;
    text-align: center;
    &.loading {
        background: none;
    }
}
</style>
