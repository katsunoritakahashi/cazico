<template>
    <div>
        <v-tooltip bottom v-if="props.canDownload">
            <template v-slot:activator="{ on: tooltip }">
                <v-btn
                    text
                    icon
                    @click="download"
                    :disabled="props.loading"
                    :loading="props.loading"
                    v-on="{ ...tooltip }"
                >
                    <v-icon left>mdi-cloud-download</v-icon>
                </v-btn>
            </template>
            <span>エクスポート</span>
        </v-tooltip>
        <v-menu
            :close-on-content-click="false"
            offset-y
            v-model="state.menuOpened"
            :nudge-width="800"
            max-height="90%"
        >
            <template v-slot:activator="{ on: menu }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on: tooltip }">
                        <v-btn
                            text
                            icon
                            color="grey lighten-1"
                            v-on="{ ...tooltip, ...menu }"
                        >
                            <v-icon :color="hasFilterCondition ? 'primary' : ''"
                                >mdi-magnify</v-icon
                            >
                        </v-btn>
                    </template>
                    <span>絞り込み</span>
                </v-tooltip>
            </template>
            <template>
                <v-form>
                    <v-container class="white pa-7">
                        <v-row>
                            <slot name="conditions" />
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="12">
                                <v-row>
                                    <v-spacer />
                                    <v-btn
                                        @click="clear"
                                        class="ma-2"
                                        text
                                        color="error"
                                    >
                                        条件をリセット
                                    </v-btn>
                                    <v-btn
                                        @click="search"
                                        class="ma-2"
                                        color="primary"
                                        >検索
                                    </v-btn>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </template>
        </v-menu>
    </div>
</template>

<script lang="ts">
import {
    computed,
    defineComponent,
    reactive,
    watch,
} from '@vue/composition-api'

type Props = {
    filterConditions: { [key: string]: string | number | undefined | [] }
    canDownload: boolean
    loading: boolean
}

export default defineComponent({
    props: {
        filterConditions: {
            type: Object,
            required: true,
        },
        canDownload: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    setup(props: Props, context) {
        let initialConditions: { [key: string]: string } = {}

        const state = reactive({
            menuOpened: false,
            applyFilterCondition: false,
        })

        function clearFilterCondition() {
            for (let key in props.filterConditions) {
                props.filterConditions[key] = Array.isArray(
                    props.filterConditions[key]
                )
                    ? []
                    : undefined
            }
            search()
        }

        const hasFilterCondition = computed(() => {
            return Object.keys(props.filterConditions).some((key) => {
                const condition = props.filterConditions[key]

                if (Array.isArray(condition)) {
                    return condition.length > 0
                }

                return (
                    props.filterConditions[key] !== '' &&
                    props.filterConditions[key] != null
                )
            })
        })

        async function clear() {
            state.menuOpened = false
            clearFilterCondition()
            context.emit('reset')
        }

        async function search() {
            state.menuOpened = false
            state.applyFilterCondition = true
            context.emit('search')
        }

        async function download() {
            context.emit('download')
        }

        watch(
            () => state.menuOpened,
            (opened: boolean, oldValue: boolean | undefined) => {
                if (oldValue === undefined) return

                if (opened) {
                    initialConditions = JSON.parse(
                        JSON.stringify(props.filterConditions)
                    )
                    // reset
                    state.applyFilterCondition = false
                } else {
                    // fetch しない場合は入力状態をリセットする
                    if (!state.applyFilterCondition) {
                        Object.keys(props.filterConditions).forEach((key) => {
                            props.filterConditions[key] = initialConditions[key]
                        })
                    }
                }
            }
        )

        return {
            props,
            state,
            search,
            hasFilterCondition,
            clear,
            download,
        }
    },
})
</script>
