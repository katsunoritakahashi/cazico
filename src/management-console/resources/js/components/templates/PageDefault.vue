<template>
    <v-row>
        <v-col cols="12">
            <v-card>
                <HeaderPage :header-color="props.headerColor">
                    <template v-slot:title>
                        <slot name="title" />
                    </template>
                </HeaderPage>
                <v-card-text>
                    <slot name="body" />
                </v-card-text>
                <v-card-actions>
                    <slot name="actionsLeft" />
                    <v-spacer />
                    <slot name="actions" />
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    props: {
        headerColor: {
            type: String,
            default: 'primary',
        },
    },
    setup(props) {
        return {
            props,
        }
    },
})
</script>
