type NotifyMessageProp = {
    isShow?: boolean
    message: string
    type?: NotificationType
}

type NotificationType = 'success' | 'info' | 'error' | 'warning'
