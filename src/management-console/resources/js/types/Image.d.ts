type Image = {
    id: string
    url: string
    fileName: string
    label?: string
}

type Pdf = {
    id: number | undefined
    pdfUrl: string
    fileName: string
}

type LoadImageFile = {
    name: string
    content: string
    sizeBytes: number
    blob: File
    id: number
    url?: string
    registered?: boolean
}

type LoadSingleImageFile = {
    name?: string
    content: string
    blob: File
    url?: string
}
