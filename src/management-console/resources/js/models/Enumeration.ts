type EnumData = { id: string; name: string; color?: string }

export class Enumeration {
    data: EnumData[]
    constructor(masterData: EnumData[]) {
        this.data = masterData
    }

    labelById(id: string) {
        const item = this.data.find((item) => item.id === id)
        return item ? item.name : '-'
    }

    colorById(id: string) {
        const item = this.data.find((item) => item.id === id)
        return item ? item.color : ''
    }

    defaultValue() {
        return this.data[0].id
    }
}
