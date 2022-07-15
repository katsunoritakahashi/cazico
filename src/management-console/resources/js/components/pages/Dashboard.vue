<template>
    <v-row>
        <v-col cols="12">
            ダッシュボード
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import getAuthorizedMenu from '@/router/menus'
import { injectAuth } from '@/components/providers/InjectHelper'
import CategoryLabel from '@/components/atoms/CategoryLabel.vue'

export default defineComponent({
    components: {
        CategoryLabel,
    },
    setup() {
        const auth = injectAuth()

        return {
            menus: getAuthorizedMenu(auth.me).filter(
                (menu) => menu.pathName !== 'dashboard'
            ),
        }
    },
})
</script>

<style lang="scss" scoped>
.dashboard-menu-icon {
    font-size: 60px;
}
</style>
