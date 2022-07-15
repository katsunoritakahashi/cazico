<template>
    <div>
        <v-menu
            :close-on-content-click="false"
            offset-y
            v-model="state.menuOpened"
            :nudge-width="400"
        >
            <template v-slot:activator="{ on: menu }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on: tooltip }">
                        <v-btn
                            text
                            icon
                            :color="hasAttachments ? 'accent' : 'grey'"
                            v-on="{ ...tooltip, ...menu }"
                        >
                            <v-icon>mdi-file</v-icon>
                        </v-btn>
                    </template>
                    <span v-if="hasAttachments">書類を見る</span>
                    <span v-else>書類登録無し</span>
                </v-tooltip>
            </template>
            <template>
                <div>
                    <v-card>
                        <v-list
                            v-for="attachment in props.attachments"
                            :key="attachment.id"
                        >
                            <v-list-item>
                                <v-list-item-title>
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <a
                                                v-on="on"
                                                href=""
                                                @click.prevent="
                                                    $emit('download', {
                                                        id: attachment.id,
                                                        name: attachment.name,
                                                    })
                                                "
                                            >
                                                {{ attachment.title }}
                                            </a>
                                        </template>
                                        <span>ダウンロード</span>
                                    </v-tooltip>
                                </v-list-item-title>
                            </v-list-item>
                            <v-divider />
                        </v-list>
                    </v-card>
                </div>
            </template>
        </v-menu>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from '@vue/composition-api'
export default defineComponent({
    props: {
        attachments: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        const state = reactive({
            menuOpened: false,
        })
        return {
            props,
            state,
            hasAttachments: computed(() => props.attachments.length > 0),
        }
    },
})
</script>
