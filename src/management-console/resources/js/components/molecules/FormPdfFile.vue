<template>
    <div>
        <v-row v-if="props.file.fileName" class="px-5">
            <v-col>
                <v-card elevation="3" class="my-5">
                    <v-list-item>
                        <v-list-item-title>{{
                            memberTypeName
                        }}</v-list-item-title>
                        <v-list-item-subtitle>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on: tooltip }">
                                    <a
                                        v-on="{ ...tooltip }"
                                        @click.prevent="download"
                                    >
                                        {{ props.file.fileName }}
                                    </a>
                                </template>
                                <span>ダウンロード</span>
                            </v-tooltip>
                        </v-list-item-subtitle>
                        <v-list-item-action class="px-5">
                            <v-btn text color="error" @click="deleteFile"
                                >削除</v-btn
                            >
                        </v-list-item-action>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else-if="props.uploadFile.content" class="px-5">
            <v-col>
                <v-card elevation="3" class="my-5">
                    <v-list-item v-show="props.uploadFile.content">
                        <v-list-item-title>{{
                            memberTypeName
                        }}</v-list-item-title>
                        <v-list-item-subtitle>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on: tooltip }">
                                    <a
                                        v-on="{ ...tooltip }"
                                        @click.prevent="
                                            previewByBlob(props.uploadFile.blob)
                                        "
                                    >
                                        {{ props.uploadFile.blob.name }}
                                    </a>
                                </template>
                                <span>プレビュー</span>
                            </v-tooltip>
                        </v-list-item-subtitle>
                        <v-list-item-action class="px-5">
                            <v-btn text color="error" @click="deleteFile"
                                >削除</v-btn
                            >
                        </v-list-item-action>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else class="px-5">
            <v-col>
                <v-card elevation="3" class="my-5">
                    <v-list-item>
                        <v-list-item-title>{{
                            memberTypeName
                        }}</v-list-item-title>
                        <v-list-item-action class="px-5">
                            <v-menu
                                :close-on-content-click="true"
                                top
                                offset-y
                                :nudge-width="200"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-row justify="end" class="ml-2">
                                        <v-btn text color="primary" v-on="on">
                                            追加する
                                        </v-btn>
                                    </v-row>
                                </template>
                                <template>
                                    <v-list>
                                        <v-list-item>
                                            <label
                                                class="input-file v-btn v-btn--flat v-btn--text theme--light v-size--default primary--text"
                                            >
                                                <input
                                                    multiple
                                                    type="file"
                                                    class="file-select"
                                                    ref="inputRef"
                                                    @change="fileUpload"
                                                    accept="application/pdf"
                                                />
                                                PC内から選択
                                            </label>
                                        </v-list-item>
                                    </v-list>
                                </template>
                            </v-menu>
                        </v-list-item-action>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'

type Props = {
    file: Pdf
    uploadFile: UploadPdf
}
export default defineComponent({
    name: 'FormPdfFile',
    props: {
        file: {
            type: Object,
            required: true,
        },
        uploadFile: {
            type: Object,
            required: false,
        },
    },
    setup(props: Props, context) {
        async function fileUpload(e: any) {
            const file = e.target.files[0] || e.dataTransfer.files[0]
            await addLocalFile(file)

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
                // console.log(blob.name, content)
                context.emit(
                    'upload',
                    blob,
                    content,
                    props.uploadFile.memberType
                )
            } catch (e) {
                console.log(e)
            }
        }

        function deleteFile() {
            context.emit('delete', props.file.id)
        }

        function deleteLocalFile() {
            context.emit('deleteLocal')
        }

        function download() {
            context.emit('download', props.file.fileName, props.file.pdfUrl)
            window.open(props.file.pdfUrl)
        }

        const memberTypeName = computed(() => {
            switch (props.uploadFile.memberType) {
                case 1:
                    return 'シェア会員利用規約'
                case 2:
                    return 'ルーム会員利用規約'
                case 3:
                    return 'ブース会員利用規約'
            }
        })

        function previewByBlob(blob: Blob) {
            if (window.navigator && window.navigator.msSaveBlob) {
                window.navigator.msSaveOrOpenBlob(blob)
            } else {
                const href = window.URL.createObjectURL(blob)
                window.open(href)
            }
        }

        const inputRef = ref<HTMLInputElement>(null)

        function clearInputForm() {
            if (inputRef.value) {
                inputRef.value.value = ''
            }
        }

        return {
            props,
            deleteFile,
            fileUpload,
            deleteLocalFile,
            download,
            previewByBlob,
            inputRef,
            memberTypeName,
        }
    },
})
</script>

<style lang="scss" scoped>
.form-image-file {
    &:hover {
        cursor: pointer;
    }
    &.draggable {
        cursor: grab;
    }
}

.form-file-box {
    position: relative;
    padding: 80px 20px;
    background: lightgray;

    &.error {
        background: red;
    }

    .contents {
        text-align: center;
    }
    .explain {
        margin-top: 20px;
        line-height: 1.4;
        color: white;
        font-weight: bold;
    }

    .file-select {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        opacity: 0;
    }
}
</style>
