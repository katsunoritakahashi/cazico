<template>
    <v-form>
        <v-container>
            <v-row v-if="!props.readonly && (props.edit || props.editMe)">
                <v-col>
                    <v-alert
                        v-if="props.operator.locked && !state.resetPassword"
                        border="left"
                        colored-border
                        type="error"
                        elevation="1"
                    >
                        ユーザがロックされています。<br />解除する場合はパスワードをリセットしてください。
                    </v-alert>
                    <v-btn
                        v-if="!props.editMe"
                        outlined
                        large
                        color="blue"
                        :disabled="state.inProgressResetPassword"
                        :loading="state.inProgressResetPassword"
                        @click="resetPassword"
                        >パスワードをリセットする</v-btn
                    >
                </v-col>
            </v-row>
            <v-row>
                <v-col :lg="8" :md="10" :sm="12">
                    <v-expansion-panels flat hover accordion :value="0">
                        <v-expansion-panel>
                            <v-expansion-panel-header class="blue--text"
                                >基本情報</v-expansion-panel-header
                            >
                            <v-expansion-panel-content>
                                <v-form>
                                    <v-container>
                                        <v-row>
                                            <v-col>
                                                <v-text-field
                                                    v-model="
                                                        props.operator.name
                                                    "
                                                    label="オペレーター名"
                                                    type="text"
                                                    :readonly="props.readonly"
                                                    :filled="props.readonly"
                                                    :error-messages="
                                                        props.errorDetails.name
                                                    "
                                                >
                                                </v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        props.operator
                                                            .displayName
                                                    "
                                                    label="表示名"
                                                    type="text"
                                                    :readonly="props.readonly"
                                                    :filled="props.readonly"
                                                    :error-messages="
                                                        props.errorDetails
                                                            .displayName
                                                    "
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        props.operator.email
                                                    "
                                                    label="メールアドレス"
                                                    type="text"
                                                    :readonly="props.readonly"
                                                    :filled="props.readonly"
                                                    :error-messages="
                                                        props.errorDetails.email
                                                    "
                                                ></v-text-field>
                                                <template v-if="props.create">
                                                    <FormPassword
                                                        v-model="
                                                            props.operator
                                                                .password
                                                        "
                                                        :error-messages="
                                                            props.errorDetails
                                                                .password
                                                        "
                                                        label="パスワード"
                                                    />
                                                </template>
                                                <template v-if="props.editMe">
                                                    <FormPassword
                                                        v-model="
                                                            props.operator
                                                                .password
                                                        "
                                                        :error-messages="
                                                            props.errorDetails
                                                                .password
                                                        "
                                                        label="現在のパスワード"
                                                    />
                                                    <FormPassword
                                                        v-model="
                                                            props.operator
                                                                .newPassword
                                                        "
                                                        label="新しいパスワード"
                                                        :error-messages="
                                                            props.errorDetails
                                                                .newPassword
                                                        "
                                                    />
                                                </template>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-form>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="8">
                    <v-expansion-panels flat hover accordion :value="0">
                        <v-expansion-panel>
                            <v-expansion-panel-header class="blue--text"
                                >通知権限</v-expansion-panel-header
                            >
                            <v-expansion-panel-content>
                                <v-simple-table class="pb-3">
                                    <template v-slot:default>
                                        <thead>
                                            <tr class="primary">
                                                <th
                                                    class="text-left white--text"
                                                >
                                                    通知権限
                                                </th>
                                                <th
                                                    class="text-left white--text"
                                                >
                                                    許可
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="tr">
                                                <td>新規契約申込み</td>
                                                <td>
                                                    <v-checkbox
                                                        :readonly="
                                                            props.readonly
                                                        "
                                                        v-model="
                                                            props.operator
                                                                .notificationNewContract
                                                        "
                                                    />
                                                </td>
                                            </tr>
                                            <tr class="tr">
                                                <td>お問い合わせ</td>
                                                <td>
                                                    <v-checkbox
                                                        :readonly="
                                                            props.readonly
                                                        "
                                                        v-model="
                                                            props.operator
                                                                .notificationContactBeautician
                                                        "
                                                    />
                                                </td>
                                            </tr>
                                            <tr class="tr">
                                                <td>チャット</td>
                                                <td>
                                                    <v-checkbox
                                                        :readonly="
                                                            props.readonly
                                                        "
                                                        v-model="
                                                            props.operator
                                                                .notificationChat
                                                        "
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-expansion-panels flat hover accordion :value="0">
                        <v-expansion-panel>
                            <v-expansion-panel-header class="blue--text"
                                >アクセス可能な店舗</v-expansion-panel-header
                            >
                            <v-expansion-panel-content>
                                <v-simple-table class="pb-3">
                                    <template v-slot:default>
                                        <thead>
                                            <tr class="primary">
                                                <th
                                                    class="text-left white--text"
                                                ></th>
                                                <th
                                                    v-for="salon in salons"
                                                    :key="salon.id"
                                                    class="text-left white--text"
                                                >
                                                    {{ salon.name }}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="tr">
                                                <td>店舗</td>
                                                <td
                                                    v-for="salon in salons"
                                                    :key="salon.id"
                                                >
                                                    <v-checkbox
                                                        :readonly="
                                                            props.readonly
                                                        "
                                                        :disabled="
                                                            !canEditPermission
                                                        "
                                                        :value="salon.id"
                                                        v-model="
                                                            props.operator
                                                                .operatorSalonIds
                                                        "
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <v-expansion-panels flat hover accordion :value="0">
                        <v-expansion-panel>
                            <v-expansion-panel-header class="blue--text"
                                >許可する権限</v-expansion-panel-header
                            >
                            <v-expansion-panel-content>
                                <FormOperatorPermissionTable
                                    :operator-permission="props.operator"
                                    :readonly="props.readonly"
                                    :create="props.create && canEditPermission"
                                    :edit="props.edit && canEditPermission"
                                    canSelectTemplate
                                />
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from '@vue/composition-api'
import { Operator } from '@/api'
import FormOperatorPermissionTable from '@/components/organisms/FormOperatorPermissionTable.vue'
import client, { httpErrorHandler } from '@/api/client'
import {
    injectDialog,
    injectNotification,
    injectMasterData,
} from '@/components/providers/InjectHelper'

type Props = {
    operator: Operator
    errorDetails: {
        name: string[]
        displayName: string[]
        email: string[]
        password: string[]
        newPassword: string[]
    }
    readonly: boolean
    create: boolean
    edit: boolean
    editMe: boolean
}

export default defineComponent({
    name: 'FormOperator',
    props: {
        operator: {},
        errorDetails: {
            type: Object,
            default: () => ({}),
        },
        readonly: {
            default: false,
            type: Boolean,
        },
        create: {
            default: false,
            type: Boolean,
        },
        edit: {
            default: false,
            type: Boolean,
        },
        editMe: {
            default: false,
            type: Boolean,
        },
    },
    components: {
        FormOperatorPermissionTable,
    },
    setup(props: Props) {
        const canEditPermission = computed(() => props.edit || props.create)
        const dialog = injectDialog()
        const notification = injectNotification()
        const { masters } = injectMasterData()
        const salons = masters.salons.map((x) => {
            let name = x.name
            if (name !== undefined && !name.endsWith('店')) {
                name = name + '店'
            }
            return { ...x, name }
        })

        const state = reactive({
            inProgressResetPassword: false,
            resetPassword: false,
        })

        function resetPassword() {
            dialog.show(
                'パスワードをリセットします。よろしいですか？',
                async () => {
                    state.inProgressResetPassword = true
                    try {
                        const { data } = await client.operatorsIdResetPassword(
                            props.operator.id || -1
                        )
                        dialog.show(
                            `新しいパスワードは<div class="font-weight-bold">${data.newPassword}</div>です。`
                        )
                        state.resetPassword = true
                    } catch (e) {
                        const { errorMessage } = httpErrorHandler(e)
                        notification.notifyMessage({
                            message: errorMessage,
                            type: 'error',
                        })
                    } finally {
                        state.inProgressResetPassword = false
                    }
                },
                { buttonColor: 'error' }
            )
        }

        return {
            props,
            state,
            canEditPermission,
            resetPassword,
            salons,
        }
    },
})
</script>
