<template>
    <v-app>
        <GlobalNavigation :drawer="state.drawer" />
        <HeaderSite :drawer="state.drawer" @toggle-drawer="toggle" />
        <v-main class="grey lighten-3" id="main-area">
            <div id="scroll-top"></div>
            <v-container fluid>
                <TransitionShow name="switch-page">
                    <router-view />
                </TransitionShow>
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import HeaderSite from '@/components/organisms/HeaderSite.vue'
import GlobalNavigation from '@/components/organisms/GlobalNavigation.vue'

export default defineComponent({
    components: {
        HeaderSite,
        GlobalNavigation,
    },
    setup() {
        const state = reactive({
            drawer: false,
        })

        function toggle() {
            state.drawer = !state.drawer
        }
        return {
            state,
            toggle,
        }
    },
})
</script>

<style lang="scss">
// メインエリアのスクロール設定
#main-area {
    overflow: scroll;
    height: calc(100vh);
}

#scroll-top {
    position: absolute;
    top: -64px;
}
</style>
