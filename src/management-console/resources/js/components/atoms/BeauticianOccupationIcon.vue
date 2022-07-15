<template>
    <div :class="['beautician-occupation-icon', typeClass, lengthClass]">
        <div class="inner">
            {{ label }}
        </div>
    </div>
</template>

<script lang="ts">
import {
    BeauticanOccupationType,
    BEAUTICIAN_OCCUPATION_ID_TYPE_MAP,
} from '@/models/SalonContractorModel'
import { defineComponent } from '@vue/composition-api'
type Props = {
    occupationId: String
}
export default defineComponent({
    name: 'BeauticianOccupationIcon',
    props: {
        occupationId: {
            type: String,
            required: true,
        },
    },
    setup(props: Props) {
        const label = (() => {
            const idType = BEAUTICIAN_OCCUPATION_ID_TYPE_MAP.find(
                (item) => item.id.toString() === props.occupationId
            )
            if (!idType) {
                return null
            }
            switch (idType.type) {
                case BeauticanOccupationType.HairDresser:
                    return '美'
                case BeauticanOccupationType.Barber:
                    return '理'
                case BeauticanOccupationType.HairMakeup:
                    return 'ヘア'
                case BeauticanOccupationType.Naylist:
                    return 'ネ'
                case BeauticanOccupationType.Eyelist:
                    return 'アイ'
                case BeauticanOccupationType.Therapist:
                    return 'セラ'
                case BeauticanOccupationType.Esthetician:
                    return 'エステ'
                case BeauticanOccupationType.Other:
                    return '他'
                default:
                    return null
            }
        })()
        const typeClass = `type-${props.occupationId}`
        const lengthClass = label ? `length-${label.length}` : ''
        return {
            props,
            typeClass,
            lengthClass,
            label,
        }
    },
})
</script>

<style lang="scss" scoped>
.beautician-occupation-icon {
    display: inline-block;
    & > .inner {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
    }
    background: #999;
    color: #fff;
    &.type-1 {
        // 美容師
        background: #00958c;
    }
    &.type-2 {
        // 理容師
        background: #eccc7a;
    }
    &.type-3 {
        // ヘアメイク
        background: #edabde;
    }
    &.type-4 {
        // ネイリスト
        background: #fa655c;
    }
    &.type-5 {
        // アイリスト
        background: #7ad1ec;
    }
    &.type-6 {
        // セラピスト
        background: #d86464;
    }
    &.type-7 {
        // エステティシャン
        background: #7a7a7a;
    }
    &.length-1 {
        font-size: 14px;
    }
    &.length-2 {
        font-size: 11px;
    }
    &.length-3 {
        font-size: 9px;
    }
}
</style>
