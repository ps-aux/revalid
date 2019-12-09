import { matchesSchema } from 'src/rule-impl/object/matchesSchema'
import {
    ListOfRule,
    ObjectData,
    ObjectSchema,
    ObjectValidator,
    ObjRuleRuleConstructor,
    RuleMap,
    ValidationErrors,
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

export const createObjectValidator = (def: ObjectSchema): ObjectValidator => {
    // If it is validation rule (for an array input)
    if (def.name && def.code && def.test) {
        // @ts-ignore
        const listRule: ListOfRule = def

        return (vals?: ObjectData) => {
            // TODO, can we do better ? That input is array should be checked by the rule
            const res = listRule.test(vals as any[])
            if (res.passed) return null

            const error = res.error!

            const detail = error.detail
            if (!detail) {
                return {
                    list: {
                        errors: [
                            {
                                code: listRule.code,
                                message: error.message,
                                detail: detail
                            }
                        ],
                        value: vals
                    }
                }
            }

            const errs: ValidationErrors = {
                // TODO improve
                [`${detail.index}`]: {
                    errors: [
                        {
                            code: listRule.code,
                            message: error.message,
                            detail: detail
                        }
                    ],
                    value: vals
                }
            }

            return errs
        }
    }

    return d => {
        const schema = toSchema(def)

        const rule = matchesSchema(schema)

        const res = rule.test(d)

        if (res.passed) return null

        const errors = res.error!.detail

        const errRes: ValidationErrors = {}

        errors.forEach(err => {
            errRes[err.attr] = {
                value: err.value,
                errors: err.errors
            }
        })

        return errRes
    }
}
