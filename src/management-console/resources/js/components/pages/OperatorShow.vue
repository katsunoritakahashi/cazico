<template>
    <PageDefault>
        <template v-slot:title>
            <DirtyBadge :dirty="dirty">
                オペレータ情報
            </DirtyBadge>
        </template>
        <template v-slot:body>
            <FormOperator
                v-show="state.progress.fetched"
                edit
                :readonly="!i.canOperatorUpdate"
                :operator="state.entity"
                :error-details="state.errorDetails"
            />
            <ProgressFetch :progress="state.progress" />
        </template>

        <template v-slot:actionsLeft>
            <v-btn
                class="mr-32"
                color="error"
                @click.prevent="deleteEvent"
                v-if="i.canOperatorUpdate"
                :loading="state.progress.post"
            >
                削除
            </v-btn>
        </template>

        <template v-slot:actions>
            <v-btn text color="primary" :to="{ name: 'operator.index' }">
                キャンセル
            </v-btn>
            <v-btn
                color="primary"
                @click.prevent="update"
                v-if="i.canOperatorUpdate"
                :loading="state.progress.post"
                :disabled="!dirty || state.progress.post"
            >
                更新する
            </v-btn>
        </template>
    </PageDefault>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import FormOperator from '@/components/organisms/FormOperator.vue'
import showSetup from '@/composition/showSetup'
import operatorModel from '@/models/OperatorModel'

type Props = {
    id: number
}

export default defineComponent({
    name: 'OperatorShow',
    components: {
        FormOperator,
    },
    props: {
        id: {
            type: Number,
        },
    },
    beforeRouteLeave(to, __, next) {
        if (to.params.forceLeave) {
            next()
        } else {
            const { guardLeave } = this as any
            guardLeave(next)
        }
    },
    setup(props, context) {
        const {
            state,
            update,
            guardLeave,
            i,
            dirtyChecker,
            deleteItem,
        } = showSetup(operatorModel, props, context)

        const deleteEvent = () => {
            deleteItem('operator.index')
        }

        return {
            state,
            update,
            guardLeave,
            dirty: dirtyChecker.isDirty,
            i,
            deleteEvent,
        }
    },
})
</script>
