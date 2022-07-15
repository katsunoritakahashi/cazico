import { inject, InjectionKey } from '@vue/composition-api'
import { MastersResponse, MeUpdateResponse, Operator } from '@/api'
import { operatorDefault } from '@/models/OperatorModel'
import { Enumeration } from '@/models/Enumeration'

// 認証処理プロバイダ
type AuthProvider = {
    me: Operator
    authenticator: Authenticator<Operator>
    setAuthInfo: (operator: Operator, data: Operator) => void
    updateAuthInfo: (meUpdateResponse: MeUpdateResponse) => void
    goToAuthedPage: () => void
}
export const authInjectKey: InjectionKey<AuthProvider> = Symbol('auth')

export const injectAuth = () => {
    return inject(authInjectKey, {
        me: operatorDefault(),
        authenticator: {
            login(email: string, password: string): Promise<Operator> {
                return Promise.resolve({
                    ...operatorDefault(),
                    email,
                    password,
                })
            },
            logout(): void {},
            getUser(): Promise<Operator> {
                return Promise.resolve(operatorDefault())
            },
        },
        setAuthInfo: () => {},
        updateAuthInfo: function() {},
        goToAuthedPage: () => {},
    })
}

// 通知処理プロバイダ
type NotificationProvider = {
    notifyMessage: (prop: NotifyMessageProp) => void
}

export const notificationInjectKey: InjectionKey<NotificationProvider> = Symbol(
    'notification'
)

export const injectNotification = () => {
    return inject(notificationInjectKey, {
        notifyMessage: () => {},
    })
}

// 編集離脱ガードプロバイダ
type LeaveGuardProvider = {
    confirm: (message: string, agreeHandler: () => void) => void
    on: (guardChecker: () => boolean) => Function
    off: () => void
}

export const leaveGuardInjectKey: InjectionKey<LeaveGuardProvider> = Symbol(
    'leaveGuard'
)

export const injectLeaveGuard = () => {
    return inject(leaveGuardInjectKey, {
        confirm: () => {},
        off: () => {},
        on: () => () => {
            return true
        },
    })
}

// ダイアログプロバイダ
type DialogProvider = {
    show: (
        message: string,
        invokeHandler?: () => void,
        options?: DialogOptions
    ) => void
}

export const dialogInjectKey: InjectionKey<DialogProvider> = Symbol('dialog')

export const injectDialog = () => {
    return inject(dialogInjectKey, {
        show: () => {},
    })
}

type Enumerations = {
    authedAtApp: Enumeration
    bankAccountType: Enumeration
}

// マスタデータプロバイダ
interface MasterDataProvider {
    masters: MastersResponse
    enumerations: Enumerations
    api: {
        succeed: boolean
        fetch: () => Promise<void>
    }
}

export const masterDataInjectKey: InjectionKey<MasterDataProvider> = Symbol(
    'masterData'
)

export const injectMasterData = () => {
    return inject<MasterDataProvider>(masterDataInjectKey, {
        api: {
            fetch: function() {
                return undefined!
            },
            succeed: false,
        },
        enumerations: undefined!,
        masters: undefined!,
    })
}

// 新着通知プロバイダ
type NewInquiryProvider = {
    isEnableNewInquiry: () => boolean
    switchNewInquiry: () => void
    fetchNewInquiry: () => void
    newCount: Record<string, number>
    resetCount: (pathName: string) => void
}

export const newInquiryInjectKey: InjectionKey<NewInquiryProvider> = Symbol(
    'newInquiry'
)
export const injectNewInquiry = () => {
    return inject(newInquiryInjectKey, {
        isEnableNewInquiry: () => false,
        switchNewInquiry: () => {},
        fetchNewInquiry: () => {},
        newCount: {
            'chat.index': 0 /* チャット管理 */,
            contract: 0 /* 契約管理 */,
            'money-transfer': 0 /* 送金管理 */,
            'notice.index': 0 /* お知らせ管理 */,
        },
        resetCount: (_pathName: string) => {},
    })
}
