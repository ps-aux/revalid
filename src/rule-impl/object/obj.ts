import { evalRule } from 'src/core/RuleEvaluator'
import {
    Data,
    ObjRuleConst,
    RuleEvaluator,
    RuleMap,
    SchemaErrorDetail,
    ValidationError,
    ValidationRule
} from 'types'

const testEntry = (
    ruleEval: RuleEvaluator,
    rules: ValidationRule<any, any>[],
    val: any
): ValidationError<any>[] => {
    // TODO support for early exit
    const errors: ValidationError<any>[] = []

    rules.forEach(r => {
        const err = ruleEval(r, val)
        if (err) errors.push(err)
    })

    return errors
}

const schemaToString = (s: RuleMap): string => {
    // TODO implement
    return `Object with keys: ${Object.keys(s).toString()}`
}

const code = 'revalid/rule/object/matches-schema'

export const obj: ObjRuleConst = schema => {
    const ruleEval = evalRule

    return {
        name: 'matches-schema',
        code,
        test: (data?: Data) => {
            if (!data)
                return {
                    passed: true
                }

            if (Array.isArray(data)) {
                return {
                    passed: false,
                    // TODO is it proper error ?
                    error: {
                        message: 'Input is an Array not an object',
                        detail: [
                            {
                                attr: '.',
                                value: data,
                                errors: []
                            }
                        ]
                    }
                }
            }

            const errors: SchemaErrorDetail = []

            Object.entries(schema).forEach(([key, rules]) => {
                const value = data[key]
                const propErrors = testEntry(ruleEval, rules, value)

                if (propErrors.length > 0) {
                    errors.push({
                        attr: key,
                        value: value,
                        errors: propErrors
                    })
                }
            })

            if (errors.length === 0)
                return {
                    passed: true
                }

            return {
                passed: false,
                error: {
                    message: 'does not match schema ' + schemaToString(schema),
                    detail: errors
                }
            }
        }
    }
}

obj.code = code
