import { Operator } from '@/api'

export default {
    // オぺレータ管理
    canOperatorRead: (me: Operator) => {
        return me.canOperatorRead
    },
    canOperatorExport: (me: Operator) => {
        return me.canOperatorExport
    },
    canOperatorUpdate: (me: Operator) => {
        return me.canOperatorUpdate
    },
    canOperatorDelete: (me: Operator) => {
        return me.canOperatorDelete
    },
    noGuard,
}

export function noGuard() {
    return true
}

export function disabled() {
    return false
}
