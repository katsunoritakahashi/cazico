import { Operator } from '@/api'
// import permission, { noGuard } from '@/router/permissionHelper'
import { noGuard } from '@/router/permissionHelper'

type Menu = {
    title: string
    navTitle?: string
    icon: string
    color?: string
    pathName: string
    validPermission: (me: Operator) => boolean | undefined
    hasBadge?: boolean
    contextMenus?: Menu[]
    category?: { label: string; color: string }
}

const menus: Menu[] = [
    {
        title: 'ホーム',
        icon: 'mdi-home',
        pathName: 'dashboard',
        validPermission: noGuard,
        hasBadge: false,
    },
]

export default function getAuthenticatedMenu(
    me: Operator,
    targetMenus?: Menu[]
) {
    return (
        targetMenus ||
        menus.filter((menu) => {
            if (menu.contextMenus) {
                menu.contextMenus = getAuthenticatedMenu(me, menu.contextMenus)
            }
            return menu.validPermission(me)
        })
    )
}
