<template>
    <div>
        <slot />
        <v-dialog :width="state.options.width" v-model="state.dialog">
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
                    <template v-if="state.hasConfirmHandler">
                        <v-spacer></v-spacer>
                        <v-btn text @click.prevent="state.dialog = false">
                            いいえ
                        </v-btn>
                        <v-btn
                            :color="state.options.buttonColor"
                            @click.prevent="invoke"
                        >
                            はい
                        </v-btn>
                    </template>
                    <template v-else>
                        <v-container>
                            <v-row
                                justify="center"
                                class="flex-column"
                                align="center"
                            >
                                <v-btn
                                    text
                                    outlined
                                    color="primary"
                                    @click.prevent="state.dialog = false"
                                >
                                    閉じる
                                </v-btn>
                            </v-row>
                        </v-container>
                    </template>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import { provide, reactive, defineComponent } from '@vue/composition-api'
import { dialogInjectKey } from '@/components/providers/InjectHelper'

export default defineComponent({
    name: 'DialogProvider',
    setup() {
        const state = reactive({
            dialog: false,
            message: '',
            options: { buttonColor: '', width: '300' },
            hasConfirmHandler: false,
        })

        function confirm(
            message: string,
            invokeHandler?: () => void,
            options: DialogOptions = { buttonColor: 'primary', width: '300' }
        ) {
            state.message = message
            state.dialog = true
            state.options.buttonColor = options.buttonColor || 'primary'
            state.options.width = options.width || '300'
            state.hasConfirmHandler = !!invokeHandler
            if (invokeHandler) {
                handler.invokeHandler = invokeHandler
            }
        }

        const handler = {
            invokeHandler: () => {},
        }
        provide(dialogInjectKey, {
            show: confirm,
        })

        function invoke() {
            state.dialog = false
            handler.invokeHandler()
        }

        return {
            state,
            invoke,
        }
    },
})
</script>
