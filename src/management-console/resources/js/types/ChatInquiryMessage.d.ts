import FieldValue = firebase.firestore.FieldValue

type ChatInquiryMessage = {
    operatorId: number
    text?: string
    file?: FireStoreFile
    image?: FireStoreFile
    isShow: boolean
    documentId?: string
    createdAt: FieldValue
    updatedAt: FieldValue
}

type ChatInquirySendMessage = {
    operatorId: number
    text?: string
    file?: FireStoreFile
    image?: FireStoreFile
    createdAt: FieldValue
    updatedAt: FieldValue
}

type FireStoreFile = {
    contentType?: string | null
    name: string
    sizeBytes: number
    url: string
}
