<template>
    <v-row>
        <v-col cols="12">
            <v-data-table
                v-bind="tableSettingDefault"
                :items="state.items"
                :items-per-page="state.perPage"
                :server-items-length="state.total"
                :loading="state.progress.fetch"
                @update:page="pagination"
                @update:items-per-page="updateItemsPerPage"
            >
                <template v-slot:top>
                    <HeaderPage>
                        <template v-slot:title>
                            オペレータ情報
                            <ButtonActionCreate
                                v-if="i.canOperatorUpdate"
                                label="オペレータ新規登録"
                                :to="{ name: 'operator.create' }"
                            />
                        </template>
                    </HeaderPage>
                    <v-toolbar flat>
                        <v-toolbar-title>オペレータ一覧</v-toolbar-title>
                        <v-spacer />
                        <FilterMenu
                            :filter-conditions="state.filterConditions"
                            @search="search"
                            :canDownload="i.canOperatorExport"
                            @download="downloadData"
                            :loading="state.progress.fetch"
                        >
                            <template v-slot:conditions>
                                <v-col cols="12" md="6">
                                    <v-text-field
                                        v-model="state.filterConditions.id"
                                        label="オペレータID"
                                        type="text"
                                        clearable
                                    />
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field
                                        v-model="state.filterConditions.name"
                                        label="オペレーター名"
                                        type="text"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field
                                        v-model="
                                            state.filterConditions.displayName
                                        "
                                        label="表示名"
                                        type="text"
                                        clearable
                                    />
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field
                                        v-model="state.filterConditions.email"
                                        label="メールアドレス"
                                    />
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-row>
                                        <v-col cols="5">
                                            <DatePicker
                                                v-model="
                                                    state.filterConditions
                                                        .createdAtFrom
                                                "
                                                label="登録日"
                                            />
                                        </v-col>
                                        <v-col
                                            cols="1"
                                            align="center"
                                            align-self="center"
                                            >〜</v-col
                                        >
                                        <v-col cols="6">
                                            <DatePicker
                                                v-model="
                                                    state.filterConditions
                                                        .createdAtTo
                                                "
                                            />
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </template>
                        </FilterMenu>
                    </v-toolbar>
                </template>
                <template v-slot:item.email="{ item }">
                    <v-icon v-if="item.locked" size="small" color="error">
                        mdi-lock
                    </v-icon>
                    <span :class="{ 'error--text': item.locked }">{{
                        item.email
                    }}</span>
                </template>
                <template v-slot:item.action="{ item }">
                    <ActionsIndex
                        :item="item"
                        :can-update="i.canOperatorUpdate"
                        :can-delete="i.canOperatorDelete"
                        :progress="state.progress"
                        @delete="deleteItem"
                        @to-show="
                            $router.push({
                                name: isNotMe(item)
                                    ? 'operator.show'
                                    : 'me.setting',
                                params: { id: item.id },
                            })
                        "
                    />
                </template>
            </v-data-table>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { Operator } from '@/api'
import indexSetup from '@/composition/indexSetup'
import operatorModel from '@/models/OperatorModel'

export default defineComponent({
    name: 'Operators',
    components: {},
    props: {},
    setup(props, context) {
        const {
            state,
            pagination,
            updateItemsPerPage,
            deleteItem,
            search,
            i,
            tableSettingDefault,
            downloadCsv,
        } = indexSetup(operatorModel, props, context, [
            {
                text: 'オペレータID',
                value: 'id',
            },
            {
                text: 'オペレーター名',
                value: 'name',
            },
            {
                text: '表示名',
                value: 'displayName',
            },
            {
                text: 'メールアドレス',
                value: 'email',
            },
            {
                text: '登録日時',
                value: 'createdAt',
            },
            { text: 'Actions', value: 'action' },
        ])

        const isNotMe = function(operator: Operator) {
            return i.id !== operator.id
        }

        const downloadData = () => {
            downloadCsv(
                'operators',
                tableSettingDefault.headers.filter((x) => x.value !== 'action')
            )
        }

        return {
            state,
            fetch,
            pagination,
            updateItemsPerPage,
            deleteItem,
            search,
            i,
            isNotMe,
            tableSettingDefault,
            downloadData,
        }
    },
})
</script>
