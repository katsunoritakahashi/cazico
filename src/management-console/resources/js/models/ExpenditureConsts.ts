import _ from 'lodash'

export enum ExpenditureTypeId {
    Booth = 1,
    Room,
    Locker,
    Seminar,
    Materials,
    Other,
}

export const EXPENDITURE_TYPE_OPTIONS = [
    { id: ExpenditureTypeId.Booth, name: 'ブース利用料' },
    { id: ExpenditureTypeId.Room, name: 'ルーム利用料' },
    { id: ExpenditureTypeId.Locker, name: 'ロッカー' },
    { id: ExpenditureTypeId.Seminar, name: '定期講習代' },
    { id: ExpenditureTypeId.Materials, name: '部材' },
    { id: ExpenditureTypeId.Other, name: 'その他' },
]

export const EXPENDITURE_LOCKER_OPTIONS = _.range(100).map((i) => {
    const id = i + 1
    return {
        id: id,
        name: ('000' + id).slice(-3),
    }
})

export const EXPENDITURE_IS_PAID_OPTIONS = [
    { id: 0, name: '未精算' },
    { id: 1, name: '精算済' },
]
