import { reactive, SetupContext, watch } from '@vue/composition-api'

type DynamicHeaderMenu = {
    routeName: string
    label: string
    to: string
}

export default function(
    headerMenus: DynamicHeaderMenu[],
    context: SetupContext
) {
    const state = reactive({
        headerMenu: { routeName: '', label: '' },
    })
    watch(
        () => context.root.$route,
        () => {
            const headerMenu = headerMenus.find(
                (menu) => menu.routeName === context.root.$route.name
            )
            state.headerMenu = headerMenu || { routeName: '', label: '' }
        }
    )

    return state
}
