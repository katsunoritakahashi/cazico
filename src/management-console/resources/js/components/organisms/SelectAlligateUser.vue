<template>
    <v-row>
        <v-col cols="4">
            <v-text-field
                v-model="state.selectedAlligateUserName"
                :label="'所有者'"
                placeholder="選択して下さい"
                :readonly="true"
            />
        </v-col>
        <v-col>
            <v-btn
                color="secondary"
                elevation="2"
                x-large
                @click="state.isShowSelectAlligateUserDialog = true"
                >会員選択</v-btn
            >
        </v-col>
        <v-dialog
            :value="state.isShowSelectAlligateUserDialog"
            @click:outside="close"
            max-width="500"
            hide-overlay
        >
            <v-card
                ><v-toolbar dark color="primary">
                    <v-btn icon dark @click="close">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>会員を選択</v-toolbar-title>
                    <v-spacer />
                </v-toolbar>

                <div class="text-center pt-5 pb-5" v-if="state.fetch">
                    <v-progress-circular indeterminate color="primary" />
                </div>
                <div v-else>
                    <div class="pl-3 pr-3">
                        <v-text-field
                            v-model="state.filterConditions.userName"
                            label="ユーザ名"
                            type="text"
                            clearable
                        />
                    </div>
                    <v-list
                        elevation="24"
                        style="height: 40vh; overflow-y: auto;"
                    >
                        <v-list-item-group color="primary">
                            <v-list-item
                                v-for="user in state.filteredUsers"
                                :key="user.userId"
                                @click="selectUser(user)"
                            >
                                <v-list-item-content>
                                    <v-list-item-title
                                        v-text="
                                            user.userName +
                                                '  [ 会員ID : ' +
                                                user.beauticianId +
                                                ' ]'
                                        "
                                    ></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </div>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script lang="ts">
import {
    defineComponent,
    onMounted,
    reactive,
    ref,
    watch,
} from '@vue/composition-api'
import { SmartlockUserResponse, SmartlockUserSummary } from '@/api'
import client from '@/api/client'
import { AxiosResponse } from 'axios'

export default defineComponent({
    components: {},

    setup(props, context) {
        const users = ref<SmartlockUserSummary[]>([])
        const filteredUsers = ref<SmartlockUserSummary[]>([])

        const filterConditions = {
            userName: '',
        }
        const state = reactive({
            isShowSelectAlligateUserDialog: false,
            filterConditions,
            selectedAlligateUserName: '',
            fetch: false,
            users,
            filteredUsers,
        })

        watch(
            () => {
                return state.filterConditions.userName
            },
            (value: string) => {
                // 読み込み中の場合
                if (!fetch) {
                    return
                }

                if (value == null) {
                    value = ''
                }

                state.filteredUsers = state.users.filter((v) =>
                    v.userName.match(value)
                )
            }
        )

        onMounted(async () => {
            state.fetch = true

            const response: AxiosResponse<SmartlockUserResponse> = await client.getSmartlocksUsers()
            users.value = response.data.data
            filteredUsers.value = users.value
            console.log(users.value)

            state.fetch = false
        })

        function close() {
            state.isShowSelectAlligateUserDialog = false
        }

        function selectUser(user: SmartlockUserSummary) {
            state.isShowSelectAlligateUserDialog = false
            context.emit('input', user.userId)
            state.selectedAlligateUserName = user.userName
        }

        return {
            props,
            state,
            close,
            selectUser,
        }
    },
})
</script>
