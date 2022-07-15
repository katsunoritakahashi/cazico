<template>
    <PageDefault>
        <template v-slot:title>
            <DirtyBadge :dirty="dirty">
                アカウント設定
            </DirtyBadge>
        </template>
        <template v-slot:body>
            <FormOperator
                editMe
                :readonly="false"
                :operator="state.meUpdateRequest"
                :error-details="state.errorDetails"
            />
        </template>

        <template v-slot:actions>
            <v-card-actions>
                <v-btn text color="primary" :to="{ name: 'home' }">
                    キャンセル
                </v-btn>
                <v-btn
                    color="primary"
                    :loading="state.progress.post"
                    :disabled="!dirty || state.progress.post"
                    @click.prevent="update"
                >
                    更新する
                </v-btn>
            </v-card-actions>
        </template>
    </PageDefault>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import client, { httpErrorHandler } from '@/api/client'
import { MeUpdateRequest } from '@/api'
import {
    injectAuth,
    injectLeaveGuard,
    injectNotification,
} from '@/components/providers/InjectHelper'
import FormOperator from '@/components/organisms/FormOperator.vue'
import DirtyChecker from '@/lib/DirtyChecker'

export default defineComponent({
    name: 'OperatorMySetting',
    components: {
        FormOperator,
    },
    props: {},
    beforeRouteLeave(to, __, next) {
        if (to.params.forceLeave) {
            next()
        } else {
            const { guardLeave } = this as any
            guardLeave(next)
        }
    },
    setup() {
        const progress: ProgressState = {
            post: false,
        }

        const auth = injectAuth()
        const leaveGuard = injectLeaveGuard()
        const notification = injectNotification()
        const dirtyChecker = new DirtyChecker()

        if (auth.me.id === undefined) {
            notification.notifyMessage({
                message: 'ID情報エラー',
                type: 'error',
            })
            return
        }

        const meUpdateRequest: MeUpdateRequest = {
            id: auth.me.id,
            email: auth.me.email || '',
            name: auth.me.name || '',
            displayName: auth.me.displayName,
            password: '',
            newPassword: '',
        }

        const errorDetails: { [key: string]: Array<string> } = {}
        const state = reactive({
            progress,
            meUpdateRequest,
            errorDetails,
        })
        dirtyChecker.init(meUpdateRequest, state.meUpdateRequest)

        async function update() {
            state.errorDetails = {}
            state.progress.post = true
            try {
                const { data } = await client.putMe(meUpdateRequest)
                notification.notifyMessage({
                    message: '更新しました',
                    type: 'success',
                })
                auth.updateAuthInfo(data)
                dirtyChecker.reset(state.meUpdateRequest)
            } catch (e) {
                const { errorMessage, errorDetails } = httpErrorHandler(e)
                state.errorDetails = errorDetails
                notification.notifyMessage({
                    message: errorMessage,
                    type: 'error',
                })
            } finally {
                state.progress.post = false
            }
        }

        return {
            state,
            update,
            dirty: dirtyChecker.isDirty,
            guardLeave: leaveGuard.on(() => dirtyChecker.someDirty()),
        }
    },
})
</script>
