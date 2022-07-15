<template>
    <AuthProvider>
        <LeaveGuardProvider>
            <DialogProvider>
                <MasterDataProvider>
                    <router-view />
                </MasterDataProvider>
            </DialogProvider>
        </LeaveGuardProvider>
    </AuthProvider>
</template>

<script lang="ts">
import AuthProvider from '@/components/providers/AuthProvider.vue'
import MasterDataProvider from '@/components/providers/MasterDataProvider.vue'
import LeaveGuardProvider from '@/components/providers/LeaveGuardProvider.vue'
import DialogProvider from '@/components/providers/DialogProvider.vue'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    components: {
        AuthProvider,
        MasterDataProvider,
        LeaveGuardProvider,
        DialogProvider,
    },
})
</script>
