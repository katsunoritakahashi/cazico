<template>
    <v-menu
        ref="vMenuRef"
        :value="props.open"
        @input="$emit('update:open', $event)"
        :close-on-content-click="false"
        :nudge-right="40"
        :disabled="props.readonly"
        transition="scale-transition"
        offset-y
        min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                :value="convNoYear(props.value)"
                @input="$emit('input', $event)"
                :label="props.label"
                prepend-icon="mdi-calendar"
                :clearable="props.clearable && !props.readonly"
                :readonly="props.readonly"
                :filled="props.readonly"
                :loading="props.loading"
                v-on="on"
                v-bind="$attrs"
                :error-messages="props.errorMessages"
            />
        </template>
        <div class="custom-date-picker">
            <v-row no-gutters>
                <v-date-picker
                    v-bind="$attrs"
                    :type="props.type"
                    v-model="state.date"
                    :allowed-dates="allowedDate"
                    @input="pickedDate"
                >
                    <v-row
                        no-gutters
                        v-if="enableTime"
                        class="date-picker-actions"
                    >
                        <v-col cols="9">
                            <VueTimepicker
                                input-width="100%"
                                :minute-interval="props.timeInterval"
                                v-model="state.time"
                                lazy
                                auto-scroll
                            />
                        </v-col>
                        <v-col cols="3">
                            <v-btn
                                text
                                outlined
                                color="primary"
                                @click="submit"
                                class="ml-1"
                                >決定</v-btn
                            >
                        </v-col>
                    </v-row>
                </v-date-picker>
            </v-row>
        </div>
    </v-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from '@vue/composition-api'
import format from 'date-fns/format'
import isToday from 'date-fns/isToday'
import isFuture from 'date-fns/isFuture'
import startOfDay from 'date-fns/startOfDay'
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'

type Props = {
    open: boolean
    enableTime: boolean
    label: string
    value: string
    type: string
    errorMessage: string
    disabledPastDate: boolean
    defaultDate: string
}

export default defineComponent({
    props: {
        open: {
            type: Boolean,
        },
        label: {
            type: String,
        },
        value: {
            type: String,
        },
        type: {
            type: String,
        },
        errorMessages: {
            type: Array,
            default: () => [],
        },
        loading: {
            type: Boolean,
            default: false,
        },
        readonly: {
            type: Boolean,
        },
        clearable: {
            type: Boolean,
            default: true,
        },
        enableTime: {
            type: Boolean,
            default: false,
        },
        timeInterval: {
            type: Number,
            default: 1,
        },
        forBirthday: {
            type: Boolean,
            default: false,
        },
        defaultDate: {
            type: String,
            default: '',
        },
        disabledPastDate: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        VueTimepicker,
    },
    setup(props: Props, context) {
        const state = reactive({
            date: '',
            time: '',
            initializedTimePickerInterval: false,
        })
        const vMenuRef: any = ref(null)

        function pickedDate() {
            if (!props.enableTime) {
                context.emit(
                    'input',
                    format(
                        startOfDay(new Date(state.date)),
                        props.type === 'month' ? 'yyyy-MM' : 'yyyy-MM-dd'
                    )
                )
                // v-menu を閉じる
                // @see https://vuetifyjs.com/en/components/date-pickers/#birthday-picker
                vMenuRef.value.save(state.date)
            }
        }

        watch(
            () => {
                return props.value
            },
            (newValue) => {
                // 空の場合
                if (!newValue) {
                    state.date = props.defaultDate
                    state.time = '00:00'
                    return
                }

                const [value1, value2] = newValue.split(' ')

                // 日付&時刻
                if (value2) {
                    state.date = value1
                    state.time = value2
                    return
                }

                // 時刻のみ
                if (value1.includes(':')) {
                    state.date = ''
                    state.time = value1
                } else {
                    // 日付のみ
                    if (value1) {
                        state.date = value1
                    }
                }
            }
        )

        function submit() {
            context.emit('update:open', false)
            context.emit('input', `${state.date} ${state.time}`)
        }
        function allowedDate(value: string) {
            const day = new Date(value)
            if (props.disabledPastDate) {
                return isFuture(day) || isToday(day)
            }
            return true
        }

        function convNoYear(val: string) {
            if (!val) {
                return val
            }

            if (val.match(/^[0-9]{4}-/)) {
                return val.slice(5)
            }
            return val
        }

        return {
            props,
            pickedDate,
            state,
            allowedDate,
            submit,
            vMenuRef,
            convNoYear,
        }
    },
})
</script>

<style lang="scss">
.vue__time-picker {
    &.time-picker {
        background: white;
    }
    .dropdown {
        top: auto;
        bottom: 35px;
        ul li:not([disabled]).active {
            background-color: #e3ecf6;
            color: #0159b0;
            &:focus,
            &:hover {
                color: inherit;
                background-color: #e3ecf6 !important;
            }
        }
    }
}
.custom-date-picker {
    .v-picker__actions.v-card__actions {
        border-top: 1px solid #e0e0e0;
    }
}
</style>
