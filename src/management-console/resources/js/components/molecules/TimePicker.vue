<template>
    <v-menu
        ref="vMenuRef"
        v-model="state.openState"
        @input="$emit('update:open', $event)"
        :close-on-content-click="false"
        :nudge-right="40"
        :disabled="props.readonly"
        transition="scale-transition"
        offset-y
        min-width="290px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                :value="props.value"
                @input="$emit('input', $event)"
                :label="props.label"
                prepend-icon="mdi-calendar"
                :clearable="props.clearable && !props.readonly"
                readonly
                :filled="props.readonly"
                :loading="props.loading"
                v-on="on"
                v-bind="attrs"
                :error-messages="props.errorMessages"
            />
        </template>
        <div class="custom-time-picker">
            <v-row no-gutters>
                <v-time-picker
                    format="24hr"
                    v-model="state.time"
                    @change="selectedMinute"
                >
                </v-time-picker>
            </v-row>
        </div>
    </v-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from '@vue/composition-api'

type Props = {
    open: boolean
    enableTime: boolean
    label: string
    value: string
    type: string
    errorMessage: string
    disabledPastDate: boolean
    defaultTime: string
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
        timeInterval: {
            type: Number,
            default: 1,
        },
        defaultTime: {
            type: String,
            default: '',
        },
        disabledPastDate: {
            type: Boolean,
            default: false,
        },
    },
    setup(props: Props, context) {
        const state = reactive({
            time: '',
            openState: props.open,
            initializedTimePickerInterval: false,
        })
        const vMenuRef: any = ref(null)

        watch(
            () => {
                return props.value
            },
            (newValue) => {
                // 空の場合
                if (!newValue) {
                    state.time = props.defaultTime
                    return
                }
                state.time = newValue
            }
        )

        function selectedMinute(value: string) {
            state.openState = false
            state.time = value
            context.emit('input', value)
            context.emit('update:open', false)
        }

        return {
            props,
            state,
            vMenuRef,
            selectedMinute,
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
.custom-time-picker {
    .v-picker__actions.v-card__actions {
        border-top: 1px solid #e0e0e0;
    }
}
</style>
