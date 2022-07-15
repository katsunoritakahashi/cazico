<template>
    <v-card outlined tile :class="['form-image-file', { draggable: hasImage }]">
        <template v-if="hasImage">
            <v-img height="150px" :src="props.file.url || props.file.content" />
            <v-card-text>
                <div v-if="props.file.sizeBytes">
                    {{ props.file.sizeBytes | bToKb }} kb
                </div>
                <div v-if="props.file.name">
                    <v-text-field readonly filled :value="props.file.name" />
                </div>
            </v-card-text>
            <v-card-actions v-show="!props.readonly">
                <v-btn icon @click.prevent="deleteFile">
                    <v-icon large color="red">mdi-delete</v-icon>
                </v-btn>
            </v-card-actions>
        </template>
        <div v-else>
            <div :class="['form-file-box', { error: false }]">
                <div class="contents">
                    <div class="plus">
                        <v-icon dark>mdi-plus</v-icon>
                    </div>
                    <div class="explain">
                        画像を追加 <br />
                        (JPGまたはPNG)
                    </div>
                </div>
                <input
                    type="file"
                    class="file-select"
                    @change="addLocalFile"
                    ref="inputRef"
                    accept="image/png,image/jpeg"
                />
            </div>
        </div>
    </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'

type Props = {
    file: LoadImageFile
}
export default defineComponent({
    filters: {
        bToKb(bytes: number) {
            return Math.floor(bytes / 1024)
        },
    },
    props: {
        file: {
            type: Object,
        },
        create: {
            type: Boolean,
            default: false,
        },
        edit: {
            type: Boolean,
            default: false,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
    },
    setup(props: Props, context) {
        function deleteFile() {
            context.emit('delete')
        }

        async function addLocalFile(e: any) {
            const blob: File = e.target.files[0] || e.dataTransfer.files[0]
            try {
                const content: string = await new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    reader.onload = () => {
                        resolve(reader.result as string)
                    }
                    reader.onerror = reject
                    reader.readAsDataURL(blob)
                })
                context.emit('loaded', {
                    blob,
                    content,
                })
                clearInputForm()
            } catch (e) {
                console.error(e)
            }
        }

        const inputRef = ref<HTMLInputElement>(null)

        function clearInputForm() {
            if (inputRef.value) {
                inputRef.value.value = ''
            }
        }

        const hasImage = computed(() => {
            return (
                props.file.id != null ||
                props.file.content !== '' ||
                (props.file.url !== '' && props.file.url != null)
            )
        })

        return {
            props,
            hasImage,
            addLocalFile,
            deleteFile,
            inputRef,
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
