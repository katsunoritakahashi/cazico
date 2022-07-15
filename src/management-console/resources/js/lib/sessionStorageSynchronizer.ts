/**
 * 入力データを入力時に即時にローカルストレージに同期する処理を行う
 *
 * @param syncDataProps  管理対象のプロパティ群
 * @todo object 対応と 型指定を排除
 *
 */
import { SetupContext, watch } from '@vue/composition-api'

export default function sessionStorageSynchronizer(
    state: any,
    syncDataProps: any[],
    context: SetupContext | string
) {
    // @todo nameSpace を渡す
    const nameSpace =
        typeof context === 'string' ? context : context.root.$route.name
    syncDataProps.forEach(({ key, type }) => {
        // 復元処理
        const propValue = sessionStorage.getItem(`${nameSpace}.${key}`)

        if (propValue != null) {
            if (type === Number) {
                const value = parseInt(propValue, 10)
                if (!isNaN(value)) {
                    bindData(state, key, value)
                }
            }

            if (type === String) {
                bindData(state, key, propValue)
            }

            if (type === Boolean || type === Array) {
                bindData(state, key, JSON.parse(propValue))
            }
        }

        // 同期監視設定
        const ret: ParsedData = parsePath(key, state)
        if (ret) {
            watch(
                () => ret.obj[ret.targetKey],
                (newValue: any) => {
                    if (Array.isArray(newValue)) {
                        sessionStorage.setItem(
                            `${nameSpace}.${key}`,
                            JSON.stringify(newValue)
                        )
                    } else if (newValue == null) {
                        sessionStorage.removeItem(`${nameSpace}.${key}`)
                    } else if (!isNaN(newValue) || newValue.length > 0) {
                        sessionStorage.setItem(`${nameSpace}.${key}`, newValue)
                    } else {
                        sessionStorage.removeItem(`${nameSpace}.${key}`)
                    }
                }
            )
        }
    })
}

type ParsedData =
    | {
          obj: any
          targetKey: string
      }
    | undefined

function bindData(vm: any, key: string, value: number | boolean | string) {
    const ret: ParsedData = parsePath(key, vm)
    if (ret) {
        ret.obj[ret.targetKey] = value
    }
}

function parsePath(path: any, obj: any) {
    const segments = path.split('.')

    for (let i = 0; i < segments.length - 1; i++) {
        if (!obj) return

        obj = obj[segments[i]]
    }

    return {
        // プリミティブ key 直前の object 参照
        obj,
        // プリミティブプロパティの key 名
        targetKey: segments[segments.length - 1],
    }
}

export function clearFilterConditions() {
    Object.keys(sessionStorage)
        .filter((key) => key.includes('filterConditions'))
        .forEach((key) => {
            sessionStorage.removeItem(key)
        })
}
