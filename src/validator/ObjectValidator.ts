import { matchesSchema } from 'src/rule-impl/object/matchesSchema'
import {
    ObjectSchema,
    ObjectValidationErrors,
    ObjectValidator,
    ObjRuleRuleConstructor,
    RuleMap,
    ValidationRule
} from 'types'
import { compose } from 'src/core/compose'
import { notNull } from 'src/rule-impl/basic-rules/notNull'

const isRule = (a: any) =>
    typeof a.test === 'function' && typeof a.name === 'string'

export const required: ObjRuleRuleConstructor = s =>
    compose([notNull(), obj(s)])

export const obj: ObjRuleRuleConstructor = s => {
    const cons = matchesSchema(toSchema(s))

    return cons
}

const toSchema = (objSchema: ObjectSchema): RuleMap => {
    const s: RuleMap = {}

    Object.entries(objSchema).forEach(([key, val]) => {
        let rules: ValidationRule<any, any>[]

        if (Array.isArray(val)) {
            rules = val
        } else if (isRule(val)) {
            rules = [val as ValidationRule<any, any>]
        } else {
            const s = val as ObjectSchema
            rules = [obj(s)]
        }

        s[key] = rules
    })

    return s
}

export const objectValidator = (def: ObjectSchema): ObjectValidator => {
    return d => {
        const schema = toSchema(def)

        const rule = matchesSchema(schema)

        const res = rule.test(d)

        if (res.passed) return null

        const errors = res.error!.detail

        const errRes: ObjectValidationErrors = {}

        errors.forEach(err => {
            errRes[err.attr] = {
                value: err.value,
                errors: err.errors
            }
        })

        return errRes
    }
}
