<template>
    <v-btn text icon color="grey lighten-1" @click="$emit('click')">
        <v-icon>mdi-cloud-download</v-icon>
    </v-btn>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {},
})
</script>
