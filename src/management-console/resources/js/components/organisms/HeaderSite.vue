<template>
    <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click.stop="$emit('toggle-drawer')" />
        <div class="mx-4 d-flex align-center">
            <img src="/images/lispo-logo.png" width="108px" />
        </div>
        <v-toolbar-title class="mr-12 align-center">
            <span class="caption font-weight-bold">ADMIN DASHBOARD</span>
        </v-toolbar-title>
        <v-spacer />

        <v-menu v-if="me.email" v-model="isShowUserMenu" :offset-y="true">
            <template v-slot:activator="{ on: menu }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on: tooltip }">
                        <v-btn
                            class="mx-2"
                            fab
                            color="primary"
                            small
                            v-on="{ ...menu, ...tooltip }"
                        >
                            <v-avatar size="36">
                                <v-icon dark>mdi-account-circle</v-icon>
                            </v-avatar>
                        </v-btn>
                    </template>
                    <span>マイメニュー</span>
                </v-tooltip>
            </template>
            <v-list>
                <v-list-item :to="{ name: 'me.setting' }">
                    <v-list-item-icon>
                        <v-icon>mdi-account-cog-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        設定
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click.prevent="logout">
                    <v-list-item-icon>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        ログアウト
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-menu>
        <span>{{ me.name }}</span>
        <span v-if="me.operatorPermissionTemplateName" class="ml-3">{{
            me.operatorPermissionTemplateName
        }}</span>
    </v-app-bar>
</template>

<script lang="ts">
import {
    injectAuth,
    injectNotification,
} from '@/components/providers/InjectHelper'
import { defineComponent, ref } from '@vue/composition-api'
import { clearFilterConditions } from '@/lib/sessionStorageSynchronizer'

type Props = {
    drawer: boolean
}

export default defineComponent({
    props: {
        drawer: {
            type: Boolean,
        },
    },
    setup(props: Props, context) {
        const auth = injectAuth()
        const notification = injectNotification()

        const isShowUserMenu = ref(false)

        async function logout() {
            await auth.authenticator.logout()
            clearFilterConditions()
            await context.root.$router.push('/login')
            notification.notifyMessage({ message: 'ログアウトしました' })
        }

        return {
            props,
            me: auth.me,
            isShowUserMenu,
            logout,
        }
    },
})
</script>

<style lang="scss" scoped></style>
