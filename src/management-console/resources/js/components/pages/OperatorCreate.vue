<template>
    <PageDefault>
        <template v-slot:title>
            オペレータ情報
        </template>
        <template v-slot:body>
            <FormOperator
                create
                :readonly="false"
                :operator="state.entity"
                :error-details="state.errorDetails"
            />
        </template>
        <template v-slot:actions>
            <v-btn text color="primary" :to="{ name: 'operator.index' }">
                キャンセル
            </v-btn>
            <v-btn
                color="primary"
                large
                :loading="state.progress.post"
                :disabled="state.progress.post"
                @click.prevent="create"
                >登録する</v-btn
            >
        </template>
    </PageDefault>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import FormOperator from '@/components/organisms/FormOperator.vue'
import createSetup from '@/composition/createSetup'
import operatorModel from '@/models/OperatorModel'

export default defineComponent({
    name: 'OperatorCreate',
    components: {
        FormOperator,
    },
    props: {},
    beforeRouteLeave(to, __, next) {
        if (to.params.forceLeave) {
            next()
        } else {
            const { guardLeave } = this as any
            guardLeave(next)
        }
    },
    setup(props, context) {
        const { state, create, guardLeave } = createSetup(
            operatorModel,
            props,
            context
        )

        return {
            props,
            state,
            create,
            guardLeave,
        }
    },
})
</script>
