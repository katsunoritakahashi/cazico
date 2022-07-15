import { reactive, ref, watch } from '@vue/composition-api'
import difference from 'lodash/difference'

export default class DirtyChecker {
    private initialValue: any
    private targetState: any
    private diff: any
    public isDirty: any = ref(false)

    init(obj: any, targetState: any) {
        this.initialValue = normalize(obj)
        this.targetState = targetState
        this.diff = reactive(normalize(obj))

        watch(
            () => targetState,
            () => this.update(),
            { deep: true }
        )
    }

    update() {
        const diff = normalize(this.initialValue)
        deepDiff(diff, normalize(this.targetState))
        deepAssign(this.diff, diff)
        this.isDirty.value = someDirty(this.diff)
    }

    reset(obj: any) {
        this.initialValue = normalize(obj)
        this.update()
    }

    someDirty(): boolean {
        return this.isDirty.value
    }
}

function normalize(obj: any) {
    return JSON.parse(JSON.stringify(obj))
}

function deepDiff(src: any, targetData: any) {
    if (src == null || targetData == null) {
        return
    }

    Object.keys(src).forEach((key) => {
        if (Array.isArray(src[key])) {
            if (src[key].length === 0 && targetData[key].length === 0) {
                src[key] = false
            } else if (src[key].length !== targetData[key].length) {
                src[key] = true
            } else {
                const itemData = src[key][0]
                if (typeof itemData === 'object') {
                    src[key].forEach((item: any, index: number) => {
                        deepDiff(item, targetData[key][index])
                    })
                } else {
                    // 値がプリミティブ型の場合
                    src[key] = difference(src[key], targetData[key]).length > 0
                }
            }
        } else if (isObject(src[key])) {
            deepDiff(src[key], targetData[key])
        } else {
            const hasDiff = src[key] !== targetData[key]
            // for debug
            // if (hasDiff) {
            //   console.log(`${key} has diff. src:${src[key]}, target:${targetData[key]}`)
            // }
            src[key] = hasDiff
        }
    })
}

function deepAssign(src: any, bindData: any) {
    Object.keys(src).forEach((key) => {
        if (bindData && bindData[key] !== undefined) {
            if (Array.isArray(src[key])) {
                src[key] = bindData[key]
            } else if (isObject(src[key])) {
                deepAssign(src[key], bindData[key])
            } else {
                src[key] = bindData[key]
            }
        }
    })
}

function someDirty(src: any): boolean {
    if (src == null) {
        return false
    }
    return Object.keys(src).some((key) => {
        if (Array.isArray(src[key])) {
            return src[key].some((item: any) => {
                return someDirty(item)
            })
        } else if (typeof src[key] === 'object') {
            return someDirty(src[key])
        } else {
            const isDirty = src[key] === true
            // if (isDirty) {
            //   console.log('src:', src)
            //   console.log('key:', key)
            // }
            return isDirty
        }
    })
}

function isObject(src: any) {
    return src != null && typeof src === 'object'
}
