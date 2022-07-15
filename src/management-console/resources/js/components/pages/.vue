<template>
  <v-data-table
    v-bind="tableSettingDefault"
    :items="state.items"
    :items-per-page="state.perPage"
    :server-items-length="state.total"
    :loading="state.progress.fetch"
    :show-select="props.isSelector"
    :single-select="props.singleSelect"
    multi-sort
    @item-selected="$emit('item-selected', $event)"
    @toggle-select-all="$emit('toggle-select-all', $event)"
    @update:page="pagination"
    @update:items-per-page="updateItemsPerPage"
    @update:options="updateSortHandler"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title v-if="props.individual">オーナー一覧</v-toolbar-title>
        <v-spacer />
        <div>
          <v-tooltip bottom v-if="!props.isSelector">
            <template v-slot:activator="{ on }">
              <v-btn
                text
                icon
                color="accent"
                v-on="{ ...on }"
                @click.prevent="copyEmailData()"
              >
                <v-icon>mdi-clipboard-text</v-icon>
              </v-btn>
            </template>
            <span>メールアドレスをクリップボードにコピーします。</span>
          </v-tooltip>
        </div>
        <FilterMenu
          :filter-conditions="state.filterConditions"
          @search="search"
          :canDownload="!props.isSelector && i.canOwnerExport"
          @download="downloadEmailData"
          :loading="state.progress.fetch"
        >
          <template v-slot:conditions>
            <Hidden>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="state.filterConditions.id"
                  label="ID"
                  type="text"
                  clearable
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="state.filterConditions.systemCode"
                  label="システムCD"
                  type="text"
                  clearable
                />
              </v-col>
            </Hidden>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="props.individual"
                v-model="state.filterConditions.fullName"
                label="氏名"
                type="text"
                clearable
              />
              <v-text-field
                v-if="props.corporate"
                v-model="state.filterConditions.corporateName"
                label="法人名"
                type="text"
                clearable
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="props.individual"
                v-model="state.filterConditions.fullNameKana"
                label="フリガナ（氏名）"
                type="text"
                clearable
              />
              <v-text-field
                v-if="props.corporate"
                v-model="state.filterConditions.corporateNameKana"
                label="フリガナ（法人名）"
                type="text"
                clearable
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="state.filterConditions.phoneNumber"
                label="電話番号"
                type="text"
                clearable
              />
            </v-col>
            <v-col cols="12" md="6">
              <SelectPrefecture v-model="state.filterConditions.prefectureId" />
            </v-col>
            <v-col cols="12" md="6">
              <SelectCity
                :prefecture-id="state.filterConditions.prefectureId"
                v-model="state.filterConditions.cityId"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-autocomplete
                item-text="name"
                item-value="id"
                :items="masters.employees"
                v-model="state.filterConditions.employeeId"
                label="担当者"
                clearable
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="state.filterConditions.ownedRoomsCountFrom"
                label="保有物件数（下限）"
                type="number"
                clearable
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="state.filterConditions.ownedRoomsCountTo"
                label="保有物件数（上限）"
                type="number"
                clearable
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="state.filterConditions.annualIncomeFrom"
                type="number"
                label="年収（下限）"
                clearable
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="state.filterConditions.annualIncomeTo"
                type="number"
                label="年収（上限）"
                clearable
              />
            </v-col>
            <v-col cols="12" md="6">
              <DatePicker
                label="決済年月（下限）"
                type="month"
                clearable
                v-model="state.filterConditions.paymentYearMonthFrom"
              />
            </v-col>
            <v-col cols="12" md="6">
              <DatePicker
                label="決済年月（上限）"
                type="month"
                clearable
                v-model="state.filterConditions.paymentYearMonthTo"
              />
            </v-col>
            <v-col cols="12" md="6"></v-col>
            <v-col cols="12" md="6">
              <v-select
                label="竣工年（下限）"
                :items="completionYearSelector"
                clearable
                v-model="state.filterConditions.completionYearFrom"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                label="竣工年（上限）"
                :items="completionYearSelector"
                clearable
                v-model="state.filterConditions.completionYearTo"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                label="認証状態"
                item-text="name"
                item-value="id"
                :items="enumerations.authedAtApp.data"
                clearable
                v-model="state.filterConditions.authedAtApp"
              />
            </v-col>
          </template>
        </FilterMenu>
      </v-toolbar>
    </template>
    <template v-slot:item.name="{ item }">
      <router-link
        :to="{
          name: 'owner.show.basic',
          params: { id: item.id },
        }"
      >
        {{ item.name }}
      </router-link>
    </template>
    <template v-slot:item.data-table-select="{ isSelected, select, item }">
      <v-checkbox
        :value="isSelected"
        @change="select($event)"
        :disabled="selectedCustomer && selectedCustomer.id !== item.id"
      />
    </template>
    <template v-slot:item.prefecture="{ item }">
      {{ item.prefecture && item.prefecture.name }}
    </template>
    <template v-slot:item.city="{ item }">
      {{ item.city && item.city.name }}
    </template>
    <template v-slot:item.employee="{ item }">
      {{ item.employee && item.employee.name }}
    </template>
    <template v-slot:item.annualIncome="{ item }">
      <template v-if="item.annualIncome">
        {{ item.annualIncome.toLocaleString() }}
      </template>
    </template>
    <template v-slot:item.authedAtApp="{ item }">
      <div v-if="item.authedAtApp == 'authed'" class="text-center">
        <v-badge color="light-green" bordered dot />
      </div>
      <div v-if="item.authedAtApp == 'temporaryAuthed'" class="text-center">
        <v-badge color="light-blue" bordered dot />
      </div>
    </template>
    <template v-slot:item.action="{ item }">
      <ActionsIndex
        :item="item"
        :can-update="i.canOwnerUpdate"
        :can-delete="i.canOwnerDelete"
        :progress="state.progress"
        @delete="deleteItem"
        @to-show="
          $router.push({
            name: 'owner.show',
            params: { id: item.id },
          })
        "
      />
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import indexSetup from '@/composition/indexSetup'
import OwnerModel from '@/models/OwnerModel'
import {
  injectMasterData,
  injectNotification,
} from '@/components/providers/InjectHelper'
import { copyToClipboard } from '@/util'
import { DataOptions } from 'vuetify'

type selectorItemType = { text: string; value: number }
function generateYears(startYear: number, endYear: number): selectorItemType[] {
  let years = []
  for (let year = startYear; year <= endYear; year++) {
    years.push({ text: '' + year, value: year })
  }
  return years
}

export default defineComponent({
  name: 'OwnersTable',
  props: {
    individual: {
      type: Boolean,
    },
    corporate: {
      type: Boolean,
    },
    isSelector: {
      type: Boolean,
      default: false,
    },
    singleSelect: {
      type: Boolean,
      default: false,
    },
    selectedCustomer: {
      type: Object,
      default: undefined,
    },
  },
  components: {},
  setup(props, context) {
    const { enumerations } = injectMasterData()
    const notification = injectNotification()

    const headersInput = [
      {
        text: 'ID',
        value: 'id',
      },
      {
        text: 'システムCD',
        value: 'systemCode',
      },
      {
        text: props.individual ? '氏名' : '法人名',
        value: 'name',
      },
      {
        text: 'フリガナ',
        value: 'nameKana',
      },
      {
        text: '電話番号',
        value: 'phoneNumber',
      },
      {
        text: '都道府県',
        value: 'prefecture',
      },
      {
        text: '市区町村',
        value: 'city',
      },
      {
        text: '営業担当',
        value: 'employee',
      },
      {
        text: '保有物件数',
        value: 'ownedRoomsCount',
        sortable: true,
      },
      {
        text: '年収（万円）',
        value: 'employerAnnualIncomeUnitOfTenThousandYen1',
        sortable: true,
      },
      {
        text: '認証済',
        value: 'authedAtApp',
      },
    ]

    if (!props.isSelector) {
      headersInput.push({ text: 'Actions', value: 'action' })
    }

    const thisYear = new Date().getFullYear()
    const paymentYearSelector = computed(() => generateYears(2006, thisYear))
    const paymentMonthSelector = computed((): selectorItemType[] =>
      enumerations.months.data.map((x) => ({
        text: x.name,
        value: parseInt(x.id),
      }))
    )
    const completionYearSelector = computed(() => generateYears(1970, thisYear))

    const {
      state,
      pagination,
      updateItemsPerPage,
      deleteItem,
      fetch,
      search,
      masters,
      i,
      tableSettingDefault,
      downloadCsv,
    } = indexSetup(OwnerModel, props, context, headersInput)

    const downloadEmailData = () => {
      const v = (val: string, newValue?: any) => {
        const d = headersInput.filter((x) => x.value === val)
        if (d.length === 0) {
          return { text: '', value: null }
        }
        if (newValue === undefined) {
          return d[0]
        } else {
          return { ...d[0], value: newValue }
        }
      }
      const l = (_id: any) => {
        return '' // FXIME 不要？
      }
      const getBirthDayOrIncorporationDate = () => {
        if (props.individual) {
          return { text: '誕生日', value: 'birthday' }
        } else {
          return { text: '設立日', value: 'corporate.incorporationDate' }
        }
      }
      downloadCsv('owners', [
        v('id'),
        v('systemCode'),
        v('name'),
        v('nameKana'),
        v('phoneNumber'),
        v('prefecture', 'prefecture.name'),
        v('city', 'city.name'),
        { text: '住所', value: 'address' },
        v('employee', 'employee.name'),
        v('ownedRoomsCount'),
        v('employerAnnualIncomeUnitOfTenThousandYen1'),
        v('authedAtApp', (item: any) =>
          item.authedAtApp === 'authed'
            ? '認証済'
            : item.authedAtApp === 'temporaryAuthed'
            ? '仮認証'
            : '未認証'
        ),
        { text: 'メールアドレス', value: 'emailAddress' },
        getBirthDayOrIncorporationDate(),
        { text: '職業', value: (item: any) => l(item.professionId) },
      ])
    }

    const copyEmailData = () => {
      const email = state.items.map((x) => x.emailAddress).join(';')
      copyToClipboard(email)
      notification.notifyMessage({
        message: 'クリップボードにコピーしました',
        type: 'success',
      })
    }

    return {
      state,
      props,
      pagination,
      updateItemsPerPage,
      deleteItem,
      search,
      i,
      masters,
      enumerations,
      tableSettingDefault,
      updateSortHandler: (options: DataOptions) => {
        state.order = options.sortBy
          .map((sortBy, index) => {
            return `${options.sortDesc[index] ? '-' : ''}${sortBy}`
          })
          .join(',')
        fetch()
      },
      paymentYearSelector,
      paymentMonthSelector,
      completionYearSelector,
      downloadEmailData,
      copyEmailData,
    }
  },
})
</script>
