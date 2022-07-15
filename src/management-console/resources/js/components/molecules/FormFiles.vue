<template>
    <div>
        <v-row>
            <v-col cols="9">
                {{ props.label ? props.label : '添付ファイル' }}
                <span v-if="props.fileCountLimit < Infinity"
                    >（{{ props.fileCountLimit }}個まで）</span
                >
            </v-col>
            <v-spacer />
            <v-menu
                v-show="!readonly"
                :close-on-content-click="true"
                top
                offset-y
                v-model="state.menuOpened"
                :nudge-width="200"
            >
                <template v-slot:activator="{ on }">
                    <v-btn
                        v-show="
                            !readonly &&
                                props.files.length + props.attachments.length <
                                    props.fileCountLimit
                        "
                        text
                        color="primary"
                        v-on="on"
                    >
                        追加する
                    </v-btn>
                </template>
                <template>
                    <v-list>
                        <template v-if="!disabledCommonAttachment">
                            <v-list-item>
                                <v-btn
                                    text
                                    color="primary"
                                    @click.prevent="
                                        state.isShowCommonAttachmentDialog = true
                                    "
                                    >共通書類から選択</v-btn
                                >
                            </v-list-item>
                            <v-divider />
                        </template>
                        <v-list-item>
                            <label
                                class="
                  input-file
                  v-btn v-btn--flat v-btn--text
                  theme--light
                  v-size--default
                  primary--text
                "
                            >
                                <input
                                    multiple
                                    type="file"
                                    class="file-select"
                                    ref="inputRef"
                                    :accept="props.accept"
                                    @change="addFromLocalFiles"
                                />
                                PC内から選択
                            </label>
                        </v-list-item>
                    </v-list>
                </template>
            </v-menu>
            <v-col
                v-if="!props.disabledCommonAttachment"
                v-show="!readonly"
                cols="3"
                class="text-right"
            >
            </v-col>
        </v-row>
        <v-row v-show="props.files.length + props.attachments.length > 0">
            <v-col>
                <v-card>
                    <!-- アップロード用 -->
                    <v-list
                        v-for="(fileState, index) in props.files"
                        :key="`upload-${index}`"
                    >
                        <v-list-item>
                            <v-list-item-title>
                                <v-tooltip bottom>
                                    <template
                                        v-slot:activator="{ on: tooltip }"
                                    >
                                        <a
                                            v-on="{ ...tooltip }"
                                            @click.prevent="
                                                previewByBlob(fileState.blob)
                                            "
                                        >
                                            {{ fileState.blob.name }}
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
                                    @click="deleteLocalFile(index)"
                                    >削除</v-btn
                                >
                            </v-list-item-action>
                        </v-list-item>
                        <v-divider
                            v-if="
                                index < props.files.length - 1 ||
                                    props.attachments.length > 0
                            "
                        />
                    </v-list>
                    <!-- ダウンロード用 -->
                    <v-list
                        v-for="(file, index) in props.attachments"
                        :key="`download-${index}`"
                    >
                        <v-list-item>
                            <v-list-item-title>
                                <template
                                    v-if="
                                        file.path &&
                                            file.path.startsWith(
                                                'other/commonAttachments'
                                            )
                                    "
                                >
                                    <v-tooltip bottom>
                                        <template
                                            v-slot:activator="{ on: tooltip }"
                                        >
                                            <a
                                                v-on="{ ...tooltip }"
                                                @click.prevent="
                                                    previewCommonAttachment(
                                                        file.id
                                                    )
                                                "
                                            >
                                                {{ file.name }}
                                            </a>
                                        </template>
                                        <span>プレビュー</span>
                                    </v-tooltip>
                                </template>
                                <template
                                    v-else-if="
                                        file.path &&
                                            file.path.startsWith(
                                                'other/templateAttachment'
                                            )
                                    "
                                >
                                    <v-tooltip bottom>
                                        <template
                                            v-slot:activator="{ on: tooltip }"
                                        >
                                            <a
                                                v-on="{ ...tooltip }"
                                                @click.prevent="
                                                    previewTemplateAttachment(
                                                        file.id
                                                    )
                                                "
                                            >
                                                {{ file.name }}
                                            </a>
                                        </template>
                                        <span>プレビュー</span>
                                    </v-tooltip>
                                </template>
                                <a
                                    v-else-if="file.id"
                                    href=""
                                    @click.prevent="$emit('download', file)"
                                    >{{ file.name }}</a
                                >
                                <span v-else>
                                    {{ file.name }}
                                </span>
                            </v-list-item-title>
                            <v-list-item-action>
                                <v-btn
                                    v-show="!readonly"
                                    text
                                    color="error"
                                    @click="willDeleteFile(index)"
                                    >削除</v-btn
                                >
                            </v-list-item-action>
                        </v-list-item>
                        <v-divider
                            v-if="index < props.attachments.length - 1"
                        />
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
        <SelectCommonAttachment
            :is-show-dialog.sync="state.isShowCommonAttachmentDialog"
            :multiple="true"
            @selected="selectedCommonAttachments"
        />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from '@vue/composition-api'
import SelectCommonAttachment from '@/components/organisms/SelectCommonAttachment.vue'
import commonAttachmentModel from '@/models/CommonAttachmentModel'
import templateAttachmentModel from '@/models/InquiryReplyTemplateModel'

type Props = {
    label?: String
    files: UploadFile[]
    attachments: ExistsFile[]
    readonly: Boolean
    fileCountLimit: Number
    errorDetails: { [key: string]: string[] }
    accept?: string
}

export default defineComponent({
    components: {
        SelectCommonAttachment,
    },
    props: {
        label: {
            type: String,
            default: undefined,
        },
        files: {
            type: Array,
            default: () => [],
        },
        attachments: {
            type: Array,
            default: () => [],
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        fileCountLimit: {
            type: Number,
            default: Infinity,
        },
        disabledCommonAttachment: {
            type: Boolean,
            default: false,
        },
        errorDetails: {
            type: Object,
            default: () => {},
        },
        accept: {
            type: String,
        },
    },
    setup(props: Props) {
        const state = reactive({
            isShowCommonAttachmentDialog: false,
        })
        const inputRef = ref<HTMLInputElement>(null)

        function clearInputForm() {
            if (inputRef.value) {
                inputRef.value.value = ''
            }
        }

        async function addFromLocalFiles(e: any) {
            const files = e.target.files || e.dataTransfer.files
            for (const file of files) {
                if (fileLength.value < props.fileCountLimit) {
                    await addLocalFile(file)
                }
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
                props.files.push({
                    blob,
                    content,
                })
            } catch (e) {
                console.log(e)
            }
        }

        function deleteLocalFile(index: number) {
            props.files.splice(index, 1)
            const error = props.errorDetails[`files.${index}`]
            if (error) {
                delete props.errorDetails[`files.${index}`]
            }
        }

        function willDeleteFile(index: number) {
            props.attachments.splice(index, 1)
        }

        const fileLength = computed(() => {
            return props.files.length + props.attachments.length
        })

        function selectedCommonAttachments(attachments: ExistsFile[]) {
            for (const file of attachments) {
                if (fileLength.value < props.fileCountLimit) {
                    props.attachments.push({
                        id: file.id!,
                        name: file.name,
                        path: file.path,
                        isCommonFile: true,
                    })
                }
            }
        }

        function previewByBlob(blob: Blob) {
            if (window.navigator && window.navigator.msSaveBlob) {
                window.navigator.msSaveOrOpenBlob(blob)
            } else {
                const href = window.URL.createObjectURL(blob)
                window.open(href)
            }
        }

        async function previewCommonAttachment(attachmentId: number) {
            const url = await commonAttachmentModel.getAttachmentUrl(
                attachmentId
            )
            window.open(url)
        }

        async function previewTemplateAttachment(attachmentId: number) {
            const url = await templateAttachmentModel.getAttachmentUrl(
                attachmentId
            )
            window.open(url)
        }

        return {
            props,
            state,
            addFromLocalFiles,
            deleteLocalFile,
            willDeleteFile,
            selectedCommonAttachments,
            inputRef,
            previewByBlob,
            previewCommonAttachment,
            previewTemplateAttachment,
            fileLength,
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
