type UploadFile = {
    blob: File
    content: string
}

type ExistsFile = {
    id: number
    name: string
    path: string
    url?: string
    isCommonFile: boolean
}

type UploadPdf = {
    blob: File
    content: string
    memberType: number
}

type UploadFiles = {
    shareFile: UploadPdf
    boothFile: UploadPdf
    roomFile: UploadPdf
}
