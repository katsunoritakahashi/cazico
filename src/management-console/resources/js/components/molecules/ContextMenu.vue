<template>
    <v-menu
        v-model="state.menuOpened"
        transition="scale-transition"
        v-bind="$attrs"
        offset-y
    >
        <template v-slot:activator="{ on }">
            <div class="d-flex align-center">
                <slot :on="on" name="button" />
            </div>
        </template>
        <template>
            <v-container class="white pa-3">
                <slot :close="close" />
            </v-container>
        </template>
    </v-menu>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
    setup(props) {
        const state = reactive({
            menuOpened: false,
        })

        function close() {
            state.menuOpened = false
        }

        return {
            state,
            props,
            close,
        }
    },
})
</script>
