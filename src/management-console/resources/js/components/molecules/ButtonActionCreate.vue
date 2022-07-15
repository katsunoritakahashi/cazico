<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-btn
                @click="$router.push(props.to)"
                absolute
                bottom
                right
                fab
                v-on="on"
            >
                <v-icon color="primary">mdi-plus</v-icon>
            </v-btn>
        </template>
        <span>{{ props.label }}</span>
    </v-tooltip>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

type Props = {}

export default defineComponent({
    props: {
        label: {
            type: String,
            default: '新規作成',
        },
        to: {
            type: Object,
        },
    },
    setup(props: Props) {
        return {
            props,
        }
    },
})
</script>
