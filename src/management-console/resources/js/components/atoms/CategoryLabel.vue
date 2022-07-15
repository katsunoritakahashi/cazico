<template>
    <div
        class="category-label"
        :style="{
            background: props.color,
        }"
    >
        <div
            class="category-label-before"
            :style="{
                'border-top': `23px solid ${props.color}`,
                'border-right': `5px solid ${props.color}`,
                'border-left': '15px solid transparent',
            }"
        ></div>
        <div class="category-label-body">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

type Props = {
    color: {
        type: string
        required: true
    }
}

export default defineComponent({
    name: 'CategoryLabel',
    props: {
        color: String,
    },
    setup(props: Props) {
        return {
            props,
        }
    },
})
</script>

<style lang="scss" scoped>
.category-label {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 35%;
    max-width: 90%;
}
.category-label-before {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    left: -16px;
}

.category-label-body {
    padding: 3px;
    color: white;
    font-size: 12px;
    white-space: nowrap;
}
</style>
