<template>
    <div>
        <slot />
    </div>
</template>

<script lang="ts">
import {
    provide,
    defineComponent,
    onBeforeMount,
    reactive,
} from '@vue/composition-api'
import { masterDataInjectKey } from '@/components/providers/InjectHelper'
import client from '@/api/client'
import { City, Prefecture } from '@/api'
import { Enumeration } from '@/models/Enumeration'

export default defineComponent({
    name: 'MasterDataProvider',
    setup() {
        const prefectures: Prefecture[] = []
        const cities: City[] = []

        // enum
        const bankAccountType = new Enumeration([
            { id: '1', name: '普通' },
            { id: '2', name: '当座' },
            { id: '3', name: 'その他' },
        ])
        const authedAtApp = new Enumeration([
            { id: 'authed', name: '認証済' },
            { id: 'temporaryAuthed', name: '仮認証済' },
            { id: 'unauthed', name: '未認証' },
        ])

        const apiState = {
            api: {
                // マスタデータ取得結果(認証エラー時の制御に使用)
                succeed: false,
                fetch: getMasterData,
            },
        }

        async function getMasterData() {
            try {
                const { data } = await client.getMasters()
                apiState.api.succeed = true
                Object.assign(masters, data)
            } catch (e) {
                apiState.api.succeed = false
            }
        }

        const masters = reactive({
            cities,
            prefectures,
        })

        provide(masterDataInjectKey, {
            masters,
            enumerations: {
                authedAtApp,
                bankAccountType,
            },
            api: apiState.api,
        })

        onBeforeMount(getMasterData)

        return {}
    },
})
</script>
