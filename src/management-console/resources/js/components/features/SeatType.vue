<template>
    <p>{{ seatPriceTypeString }}</p>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

type Props = {
    seatPriceType: number
}

export default defineComponent({
    name: 'SeatPriceType',
    props: {
        seatPriceType: {
            type: Number,
        },
    },
    setup(props: Props) {
        let seatPriceTypeString = ''
        if (props.seatPriceType === 1) {
            seatPriceTypeString = 'シェア席'
        } else if (props.seatPriceType === 2) {
            seatPriceTypeString = 'ブース席'
        }
        return {
            seatPriceTypeString,
        }
    },
})
</script>
