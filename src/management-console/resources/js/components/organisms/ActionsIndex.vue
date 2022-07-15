<template>
    <div>
        <a v-if="props.hasDetailPage" @click.prevent="$emit('to-show')">
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-icon small class="mr-4" v-on="on" color="accent">
                        mdi-{{
                            props.canUpdate ? 'pencil' : 'eye-settings-outline'
                        }}
                    </v-icon>
                </template>
                <span>{{ props.canUpdate ? '編集' : '詳細' }}</span>
            </v-tooltip>
        </a>
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-icon
                    v-if="props.canDelete"
                    v-show="props.progress.targetId !== props.item.id"
                    small
                    color="error"
                    @click="$emit('delete', props.item.id)"
                    v-on="on"
                >
                    mdi-delete
                </v-icon>
                <v-progress-circular
                    v-show="props.progress.targetId === props.item.id"
                    :size="15"
                    :width="2"
                    indeterminate
                    color="error"
                />
            </template>
            <span>削除</span>
        </v-tooltip>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    props: {
        item: {
            type: Object,
            required: true,
        },
        canUpdate: {
            type: Boolean,
            default: false,
        },
        canDelete: {
            type: Boolean,
            default: false,
        },
        hasDetailPage: {
            type: Boolean,
            default: true,
        },
        progress: {
            type: Object,
            default: () => ({
                targetId: null,
            }),
        },
    },
    setup(props) {
        return { props }
    },
})
</script>
