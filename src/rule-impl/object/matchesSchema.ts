import { evalRule } from 'src/core/RuleEvaluator'
import {
    Data,
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

    console.log('testing', val, rules)
    rules.forEach(r => {
        const err = ruleEval(r, val)
        console.log('   rule', r, err)
        if (err) errors.push(err)
    })

    return errors
}

const schemaToString = (s: RuleMap): string => {
    // TODO implement
    return `Object with keys: ${Object.keys(s).toString()}`
}

export const matchesSchema = (
    schema: RuleMap
): ValidationRule<Data, SchemaErrorDetail> => {
    const ruleEval = evalRule

    return {
        name: 'matches-schema',
        test: (data?: Data) => {
            if (!data)
                return {
                    passed: true
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
