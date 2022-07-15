<template>
    <div>
        <v-row class="py-0">
            <v-col cols="9">
                {{ props.label }}
            </v-col>
            <v-spacer />
            <v-col>
                <template v-if="!props.readonly && !hasFile">
                    <label
                        class="input-file v-btn v-btn--flat v-btn--text theme--light v-size--default primary--text"
                    >
                        <input
                            multiple
                            type="file"
                            class="file-select"
                            ref="inputRef"
                            @change="addFromLocalFiles"
                        />追加する</label
                    >
                </template>
            </v-col>
        </v-row>
        <v-row v-show="hasFile">
            <v-col>
                <v-card>
                    <!-- アップロード用 -->
                    <v-list v-if="props.file">
                        <v-list-item>
                            <v-list-item-title>
                                <v-tooltip bottom>
                                    <template
                                        v-slot:activator="{ on: tooltip }"
                                    >
                                        <a
                                            v-on="{ ...tooltip }"
                                            @click.prevent="
                                                previewByBlob(props.file.blob)
                                            "
                                        >
                                            {{ props.file.blob.name }}
                                        </a>
                                    </template>
                                    <span>プレビュー</span>
                                </v-tooltip>
                                <div
                                    v-if="
                                        props.errorDetails &&
                                            props.errorDetails.file
                                    "
                                    class="mt-2"
                                >
                                    <ValidationError
                                        :error-messages="
                                            props.errorDetails.file
                                        "
                                    />
                                </div>
                                <div
                                    v-if="
                                        props.errorDetails &&
                                            props.errorDetails[`files.${index}`]
                                    "
                                    class="mt-2"
                                >
                                    <div
                                        class="v-messages theme--light error--text"
                                        role="alert"
                                    >
                                        {{
                                            props.errorDetails[
                                                `files.${index}`
                                            ][0]
                                        }}
                                    </div>
                                </div>
                            </v-list-item-title>
                            <v-list-item-action>
                                <v-btn
                                    v-show="!readonly"
                                    text
                                    color="error"
                                    @click="deleteLocalFile()"
                                    >削除</v-btn
                                >
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                    <!-- ダウンロード用 -->
                    <v-list v-if="props.attachment">
                        <v-list-item>
                            <v-list-item-title>
                                <a :href="props.attachment" target="_blank">
                                    {{ fileName }}
                                </a>
                            </v-list-item-title>
                            <v-list-item-action>
                                <v-btn
                                    v-show="!readonly"
                                    text
                                    color="error"
                                    @click="willDeleteFile()"
                                    >削除</v-btn
                                >
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'

type Props = {
    label: string
    file?: UploadFile
    attachment?: string
    readonly: Boolean
    errorDetails: { [key: string]: string[] }
}

export default defineComponent({
    components: {},
    props: {
        label: {
            type: String,
            default: '添付ファイル',
        },
        file: {
            type: Object,
            default: undefined,
        },
        attachment: {
            type: String,
            default: undefined,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        errorDetails: {
            type: Object,
            default: () => {},
        },
    },
    setup(props: Props, context) {
        const inputRef = ref<HTMLInputElement>(null)

        function clearInputForm() {
            if (inputRef.value) {
                inputRef.value.value = ''
            }
        }

        async function addFromLocalFiles(e: any) {
            const files = e.target.files || e.dataTransfer.files
            for (const file of files) {
                await addLocalFile(file)
                break
            }
            clearInputForm()
        }

        async function addLocalFile(blob: File) {
            try {
                const content: string = await new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    reader.onload = () => {
                        resolve(reader.result as string)
                    }
                    reader.onerror = reject
                    reader.readAsText(blob)
                })
                context.emit('update:file', {
                    blob,
                    content,
                })
            } catch (e) {
                console.log(e)
            }
        }

        function deleteLocalFile() {
            context.emit('update:file', undefined)
        }

        function willDeleteFile() {
            context.emit('update:attachment', undefined)
        }

        function previewByBlob(blob: Blob) {
            if (window.navigator && window.navigator.msSaveBlob) {
                window.navigator.msSaveOrOpenBlob(blob)
            } else {
                const href = window.URL.createObjectURL(blob)
                window.open(href)
            }
        }

        const hasFile = computed(() => {
            return !!props.file || !!props.attachment
        })

        const fileName = computed(() => {
            const NO_NAME = '-'
            const url = props.attachment
            if (!url) {
                return NO_NAME
            }
            const lastpath = url.split('/').pop()
            if (!lastpath) {
                return NO_NAME
            }
            const excludeHash = lastpath.split('#').shift()
            if (!excludeHash) {
                return NO_NAME
            }
            const excludeQuery = excludeHash.split('?').shift()
            if (!excludeQuery) {
                return NO_NAME
            }
            return excludeQuery
        })

        return {
            props,
            addFromLocalFiles,
            deleteLocalFile,
            willDeleteFile,
            inputRef,
            previewByBlob,
            hasFile,
            fileName,
        }
    },
})
</script>

<style lang="scss">
.file-select {
    display: none;
}
.input-file {
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: flex-start;
}
</style>
