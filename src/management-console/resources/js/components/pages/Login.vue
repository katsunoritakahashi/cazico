<template>
    <v-app>
        <v-main>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md6>
                        <v-card class="elevation-12">
                            <v-toolbar flat :height="150">
                                <v-container>
                                    <v-row justify="center">
                                        <v-toolbar-title class="text-center">
                                            <img
                                                src="/images/lispo-logo.png"
                                                width="200px"
                                            />
                                            <p class="caption font-weight-bold">
                                                ADMIN DASHBOARD
                                            </p>
                                        </v-toolbar-title>
                                    </v-row>
                                </v-container>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                        v-model="state.email"
                                        label="メールアドレス"
                                        prepend-icon="mdi-account-tie"
                                        required
                                        type="text"
                                        :error-messages="
                                            state.errorDetails.email
                                        "
                                    />

                                    <FormPassword
                                        v-model="state.password"
                                        label="password"
                                        required
                                        :error-messages="
                                            state.errorDetails.password
                                        "
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-container>
                                    <v-row
                                        justify="center"
                                        class="flex-column"
                                        align="center"
                                    >
                                        <v-btn
                                            class="ma-2"
                                            :loading="state.progress.post"
                                            :disabled="state.progress.post"
                                            color="primary"
                                            @click.prevent="login"
                                            >ログイン
                                        </v-btn>
                                        <p class="caption">
                                            パスワードをお忘れの場合は管理者にお問い合わせください
                                        </p>
                                    </v-row>
                                </v-container>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import { httpErrorHandler } from '@/api/client'
import Header from '@/components/organisms/HeaderSite.vue'
import GlobalNavigation from '@/components/organisms/GlobalNavigation.vue'
import {
    injectAuth,
    injectNotification,
    injectMasterData,
} from '@/components/providers/InjectHelper'
import { clearFilterConditions } from '@/lib/sessionStorageSynchronizer'

export default defineComponent({
    name: 'Login',
    components: {
        Header,
        GlobalNavigation,
    },
    setup() {
        const progress: ProgressState = {
            post: false,
        }

        const auth = injectAuth()
        const notification = injectNotification()
        const masterData = injectMasterData()
        const state = reactive({
            progress,
            email:
                process.env.NODE_ENV === 'development'
                    ? 'admin@example.com'
                    : '',
            password: process.env.NODE_ENV === 'development' ? 'password' : '',
            errorDetails: {},
        })

        async function login() {
            state.progress.post = true
            try {
                const authenticatedOperator = await auth.authenticator.login(
                    state.email,
                    state.password
                )
                auth.setAuthInfo(auth.me, authenticatedOperator)
                auth.goToAuthedPage()
                notification.notifyMessage({
                    message: 'ログインしました',
                    type: 'success',
                })
                clearFilterConditions()
                if (!masterData.api.succeed) {
                    await masterData.api.fetch()
                }
            } catch (e) {
                console.log('e:', e)
                const { errorMessage, errorDetails } = httpErrorHandler(e)
                state.errorDetails = errorDetails
                notification.notifyMessage({
                    message: errorMessage || 'ログインに失敗しました',
                    type: 'error',
                })
            } finally {
                state.progress.post = false
            }
        }

        return {
            state,
            login,
        }
    },
})
</script>
