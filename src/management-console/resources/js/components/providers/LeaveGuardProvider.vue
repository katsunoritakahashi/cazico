<template>
    <div>
        <slot />
        <v-dialog width="300" v-model="state.dialog">
            <v-card>
                <v-card-title>
                    <v-row justify="center" class="flex-column">
                        <div
                            class="ma-4 body-1 text-center"
                            v-html="state.message"
                        ></div>
                    </v-row>
                </v-card-title>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text @click.prevent="state.dialog = false">
                        いいえ
                    </v-btn>

                    <v-btn color="primary" @click.prevent="agreeHandler">
                        はい
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import { provide, reactive, defineComponent } from '@vue/composition-api'
import { leaveGuardInjectKey } from '@/components/providers/InjectHelper'
import { RawLocation } from 'vue-router/types/router'

export default defineComponent({
    name: 'LeaveGuardProvider',
    setup() {
        const state = reactive({
            dialog: false,
            disabled: false,
            message: '',
        })

        function confirm(message: string, agreeHandler: () => void) {
            state.message = message
            state.dialog = true
            handler.agreeHandler = agreeHandler
        }

        function createGuard(guardCondition: () => boolean): Function {
            state.disabled = false
            return function(next: (to?: RawLocation | false | void) => void) {
                if (state.disabled) {
                    next()
                    return
                }

                const guard = guardCondition()
                if (guard) {
                    confirm(
                        '編集中の情報があります。<br>よろしいですか？',
                        next
                    )
                } else {
                    next()
                }
            }
        }

        const handler = {
            agreeHandler: () => {},
        }
        provide(leaveGuardInjectKey, {
            confirm,
            on: createGuard,
            off: () => {
                state.disabled = true
            },
        })

        function agreeHandler() {
            state.dialog = false
            handler.agreeHandler()
        }

        return {
            state,
            agreeHandler,
        }
    },
})
</script>
