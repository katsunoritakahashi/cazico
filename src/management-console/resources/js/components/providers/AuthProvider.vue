<template>
    <div>
        <div v-if="initialAuthorized">
            <slot />
        </div>
        <v-app v-else>
            <v-container fluid fill-height full-width>
                <v-layout align-center justify-center>
                    <v-progress-circular indeterminate color="primary" />
                </v-layout>
            </v-container>
        </v-app>
    </div>
</template>

<script lang="ts">
import AuthenticatorJwt from '@/lib/AuthenticatorJwt'
import { MeUpdateResponse, Operator } from '@/api'

import {
    provide,
    reactive,
    defineComponent,
    SetupContext,
    onBeforeMount,
    ref,
} from '@vue/composition-api'
import { authInjectKey } from '@/components/providers/InjectHelper'
import { operatorDefault } from '@/models/OperatorModel'

export default defineComponent({
    setup(_, context: SetupContext) {
        const initialAuthorized = ref(false)

        const authenticator = new AuthenticatorJwt()

        const defineOperator: Operator = operatorDefault()

        const me = reactive(defineOperator)
        let routeInfoAtFailed = {
            name: 'home',
            params: {},
        }
        const goToAuthedPage = async () => {
            await context.root.$router.push(routeInfoAtFailed)
            // ăȘă»ăă
            routeInfoAtFailed.name = 'home'
            routeInfoAtFailed.params = {}
        }
        const setAuthInfo = (operator: Operator, data: Operator) => {
            Object.assign(operator, data)
        }

        const updateAuthInfo = (meUpdateResponse: MeUpdateResponse) => {
            Object.assign(me, meUpdateResponse.data)
        }

        provide(authInjectKey, {
            me,
            authenticator,
            setAuthInfo,
            updateAuthInfo,
            goToAuthedPage,
        })

        onBeforeMount(async () => {
            setRouteGuard()

            if (!context.root.$route.meta.requiredAuth) {
                initialAuthorized.value = true
                return
            }

            async function failed() {
                // èȘèšŒăšă©ăŒæăźæ»ăćăă»ăă
                if (context.root.$route.name !== 'login') {
                    routeInfoAtFailed = {
                        name: context.root.$route.name || 'home',
                        params: context.root.$route.params,
                    }
                    await context.root.$router.push({ name: 'login' })
                    initialAuthorized.value = true
                }
                context.emit('failed')
            }

            // ććèȘèšŒ
            try {
                const authorizedOperator = await authenticator.getUser()

                // æš©éăă§ăăŻ
                if (
                    !context.root.$route.meta.validPermission(
                        authorizedOperator
                    )
                ) {
                    await failed()
                    return
                }

                setAuthInfo(me, authorizedOperator)
                context.emit('succeeded', me)
            } catch (e) {
                await failed()
            }

            initialAuthorized.value = true
        })

        function setRouteGuard() {
            context.root.$router.beforeEach(async (to, from, next) => {
                function failed() {
                    context.emit('failed')
                    // èȘèšŒăšă©ăŒæăźæ»ăćăă»ăă
                    routeInfoAtFailed = {
                        name: to.name || 'home',
                        params: to.params,
                    }
                    next({ name: 'login' })
                }

                if (!to.meta.requiredAuth) {
                    next()
                    return
                }

                // ăŻăšăȘăźć€æŽăŻăă§ăăŻăăȘă
                if (to.path === from.path) {
                    next()
                    return
                }

                try {
                    // æš©éăă§ăăŻ
                    if (!to.meta.validPermission(me)) {
                        failed()
                        return
                    }

                    next()
                } catch (e) {
                    failed()
                }
            })
        }

        return {
            initialAuthorized,
        }
    },
})
</script>
