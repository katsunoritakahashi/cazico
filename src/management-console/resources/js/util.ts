import { format, parse, parseISO } from 'date-fns'
import { Enumeration } from '@/models/Enumeration'
import { AxiosError } from 'axios'

export function clickDownload(url: string, fileName: string) {
    const downloadLink = document.createElement('a')
    downloadLink.href = url
    downloadLink.target = '_blank'
    downloadLink.download = fileName
    downloadLink.click()
    downloadLink.remove()
}

export function sleep(timeMillis: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeMillis)
    })
}

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export function downloadFile(data: any, fileName: string) {
    const blob = new Blob([data], { type: 'application/pdf' })

    if (window.navigator && window.navigator.msSaveBlob) {
        window.navigator.msSaveOrOpenBlob(blob)
    } else {
        const downLoadLink = document.createElement('a')
        downLoadLink.download = fileName
        downLoadLink.href = window.URL.createObjectURL(blob)
        downLoadLink.click()
    }
}

export function openFileAtTab(data: any, fileName: string) {
    const blob = new Blob([data], { type: 'application/pdf' })

    if (window.navigator && window.navigator.msSaveBlob) {
        window.navigator.msSaveOrOpenBlob(blob, fileName)
    } else {
        const href = window.URL.createObjectURL(blob)
        window.open(href, fileName)
    }
}

export function downloadData(
    data: BlobPart,
    fileName: string,
    contentType: string
) {
    const blob = new Blob([data], { type: contentType })
    const nav = window.navigator as any
    if (nav && nav.msSaveBlob) {
        nav.msSaveOrOpenBlob(blob)
    } else {
        const downLoadLink = document.createElement('a')
        downLoadLink.download = fileName
        downLoadLink.href = window.URL.createObjectURL(blob)
        downLoadLink.click()
        downLoadLink.remove()
    }
}

export function clampText(text: string, count: number = 80) {
    if (!text) return ''
    if (text.length > 100) {
        return text.slice(0, count) + '...'
    }
    return text
}

export function copyToClipboard(text: string) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
    }
}

export function nonNull(val: string | number) {
    return val !== undefined && val !== null && val !== ''
}

export function attrIfHas(
    obj: any,
    name: string | Array<string>
): any | undefined {
    if (obj === undefined || obj === null) {
        return undefined
    }
    let properties
    if (typeof name === 'string') {
        if (name !== null || name !== undefined || name !== '') {
            properties = name.split('.')
        } else {
            return obj
        }
    } else {
        if (Array.isArray(name)) {
            properties = name
        } else {
            return obj
        }
    }

    if (properties.length === 0) {
        return obj
    }
    if (obj.hasOwnProperty(properties[0])) {
        return attrIfHas(obj[properties[0]], properties.slice(1))
    } else {
        return undefined
    }
}

export function fmtDate(d: Date, fmt: string = 'yyyy-MM-dd') {
    return format(d, fmt)
}

export function todayStr(fmt: string = 'yyyy-MM-dd') {
    return fmtDate(new Date(), fmt)
}

export function convDateFormat(
    d: string,
    fromFmt: string,
    toFmt: string
): string {
    return format(parse(d, fromFmt, new Date()), toFmt)
}
export function convDateFormatISO(d: string, toFmt: string): string {
    if (d == null) return ''
    return format(parseISO(d), toFmt)
}

// 日付区切りをハイフンではなくスラッシュにする想定
export function convDateYmd(d: string, fmt: string = 'yyyy/MM/dd') {
    return convDateYmdHms(d, fmt)
}
export function convDateYmdHms(d: string, fmt: string = 'yyyy/MM/dd HH:mm:ss') {
    if (d == null) return ''
    if (d.length === 27) {
        return convDateFormatISO(d, fmt)
    }
    return convDateFormat(d, 'yyyy-MM-dd HH:mm:ss', fmt)
}

export function getPriorityMemberTypeId(
    salons?: Array<{ memberTypeId?: number | string }>
) {
    if (!salons || !salons.length) {
        return undefined
    }
    if (salons.length === 1) {
        return salons[0].memberTypeId
    }

    let memberTypeId
    for (let salon of salons) {
        const mid = '' + salon.memberTypeId
        // 2(ルーム) > 3(ブース) > 1(シェア) の優先順で設定する
        if (memberTypeId === undefined && mid === '1') {
            memberTypeId = mid
        } else if (memberTypeId !== '2' && mid === '3') {
            memberTypeId = mid
        } else if (mid === '2') {
            memberTypeId = mid
        }
    }
    if (memberTypeId === undefined) {
        return undefined
    }
    return memberTypeId
}

export function getMemberTypeName(
    memberTypeEnum: Enumeration,
    salons?: Array<{ memberTypeId?: number | string }>
) {
    const none = '-'
    const mid = getPriorityMemberTypeId(salons)
    if (mid) {
        return memberTypeEnum.labelById('' + mid) || none
    } else {
        return none
    }
}

export function concatNameObj(
    obj?: { firstName?: string; lastName?: string },
    defaultName: string = '-'
) {
    if (obj) {
        return concatName(obj.firstName, obj.lastName, defaultName)
    } else {
        return defaultName
    }
}

export function concatNameRubyObj(
    obj?: { firstNameRuby?: string; lastNameRuby?: string },
    defaultName: string = '-'
) {
    if (obj) {
        return concatName(obj.firstNameRuby, obj.lastNameRuby, defaultName)
    } else {
        return defaultName
    }
}

export function concatName(
    firstName?: string,
    lastName?: string,
    defaultName: string = '-'
) {
    if (firstName && lastName) {
        return lastName + ' ' + firstName
    } else if (firstName) {
        return firstName
    } else if (lastName) {
        return lastName
    } else {
        return defaultName
    }
}

export function calcSalonName(salons: Array<{ salonName?: string }>) {
    if (!salons || !salons.length) {
        return '-'
    }
    const suffix = '店'
    if (salons.length === 1) {
        return salons[0].salonName + suffix
    }
    return '複数店舗'
}

export function calcSalonNameJoin(
    salons: Array<{ salonName?: string }>,
    separator: string = ','
) {
    if (!salons || !salons.length) {
        return '-'
    }
    const suffix = '店'
    if (salons.length === 1) {
        return salons[0].salonName + suffix
    }
    return salons.map((x) => x.salonName + suffix).join(separator)
}

export function calcOccupationNameJoin(
    occupations: Array<{ occupationName?: string }>,
    separator: string = ','
) {
    if (!occupations || !occupations.length) {
        return '-'
    }
    return occupations.map((x) => x.occupationName).join(separator)
}

export function numFmt(num: number) {
    return new Intl.NumberFormat().format(num)
}

export function calcMenuName(menus: Array<{ menuName?: string }>) {
    if (!menus || !menus.length) {
        return '-'
    }

    if (menus.length === 1) {
        return menus[0].menuName
    }
    return '複数'
}

export function calcBeautyEquipmentName(
    beautyEquipments: Array<{
        beautyEquipmentName?: string
        beautyEquipmentTime?: string
    }>
) {
    if (!beautyEquipments || !beautyEquipments.length) {
        return '-'
    }

    if (beautyEquipments.length === 1) {
        return (
            beautyEquipments[0].beautyEquipmentName +
            ' ' +
            beautyEquipments[0].beautyEquipmentTime
        )
    }
    return '複数'
}

export function slashSeparated(first: any, second: any) {
    return first + ' / ' + second
}

export function isAxiosError(error: unknown): error is AxiosError {
    if (typeof error === 'object') {
        return (
            !!error && 'isAxiosError' in error && !!(error as any).isAxiosError
        )
    }
    return false
}

export function getMessageFromAxiosError(error: unknown): string | undefined {
    if (isAxiosError(error)) {
        if (
            error.response &&
            'message' in error.response.data &&
            typeof error.response.data.message === 'string'
        ) {
            return error.response.data.message
        }
    }

    return undefined
}
