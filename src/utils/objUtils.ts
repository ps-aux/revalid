import _flatten from 'flat'
import { pick } from 'ramda'

const unflatten = _flatten.unflatten

export type Obj = Record<string, unknown>

export const get = (path: string[], obj: Obj | null | undefined) =>
    pick(path, obj)

const isObj = (obj: any): obj is Obj => {
    return typeof obj === 'object' && !Array.isArray(obj)
}

type Path = string[]

export const collectAttrPaths = <T = any>(
    obj: Obj,
    acc: [Path, any][],
    untilMatch: (val: any) => boolean = () => false,
    parentPath: Path = []
) => {
    Object.entries(obj).forEach(([key, val]) => {
        const path = [...parentPath]
        path.push(key)

        if (isObj(val) && !untilMatch(val)) {
            collectAttrPaths(val, acc, untilMatch, path)
        } else {
            acc.push([path, val])
        }
    })
}

export const flattenObj = <T = any>(
    obj: Obj,
    untilMatch: (val: any) => boolean = () => false
): { [key: string]: any } => {
    const entries: [Path, any][] = []

    collectAttrPaths(obj, entries, untilMatch, [])

    const res = {}
    entries.forEach(([path, val]) => {
        res[path.join('.')] = val
    })

    return res
}

export const toObj = (attrs: [Path, any][]): Obj => {
    const res: Obj = {}

    attrs.forEach(([path, val]) => {
        res[path.join('.')] = val
    })

    return unflatten(res)
}
