<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <span
                ref="target"
                @click.prevent="copyToClipBoard"
                v-on="on"
                class="button-copy-to-clip-board"
            >
                <slot />
            </span>
        </template>
        <span>クリップボードにコピー</span>
    </v-tooltip>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api'
import { injectNotification } from '@/components/providers/InjectHelper'

export default defineComponent({
    setup(props) {
        const target = ref(null)
        const notification = injectNotification()

        const listener = (e: ClipboardEvent) => {
            if (!e.clipboardData) return

            const targetElement: any = target.value
            e.clipboardData.setData(
                'text/plain',
                targetElement.textContent.trim()
            )
            e.preventDefault()
            document.removeEventListener('copy', listener)
        }

        onMounted(() => {
            const targetElement: any = target.value
            targetElement.addEventListener('copy', listener)
        })
        function copyToClipBoard() {
            document.execCommand('copy')
            notification.notifyMessage({
                message: 'コピーしました',
                type: 'success',
            })
        }

        return {
            props,
            target,
            copyToClipBoard,
        }
    },
})
</script>

<style lang="scss">
.button-copy-to-clip-board {
    cursor: pointer;
}
</style>
