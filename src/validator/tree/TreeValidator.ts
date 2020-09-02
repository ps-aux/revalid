import {
    CreateTreeValidator,
    TreeValidationErrorResult,
    ValidationError,
    ValidationRule
} from '../../../types'
import { evalRule } from '../../core'
import { collectAttrPaths, get, Obj, toObj } from '../../utils/objUtils'

const propRule = (
    path: string[],
    rule: ValidationRule<any, any>
): ValidationRule<Obj, any> => {
    const getVal = (obj: Obj | null | undefined) => get(path, obj)

    return {
        code: rule.code,
        test: (obj, evalRule) => {
            const val = getVal(obj)
            return rule.test(val, evalRule)
        }
    }
}

type PropRules = {
    path: string[]
    rules: ValidationRule<any, any>[]
}

export const treeValidator: CreateTreeValidator = schema => {
    const collected: [string[], ValidationRule<any, any>[]][] = []
    collectAttrPaths(schema, collected)

    const rules: PropRules[] = collected.map(([path, rules]) => {
        return {
            path,
            rules: rules.map(r => propRule(path, r))
        }
    })

    const validator = {
        validate: obj => {
            const attrErrors: [string[], ValidationError[]][] = []

            rules.forEach(pr => {
                const path = pr.path
                // @ts-ignore TODO
                const errs = pr.rules
                    .map(r => evalRule(r, obj))
                    .filter(err => !!err) as ValidationError[]
                if (errs.length > 0) attrErrors.push([path, errs])
            })

            if (attrErrors.length === 0) return null

            return toObj(attrErrors) as TreeValidationErrorResult
        }
    }

    return validator
}
