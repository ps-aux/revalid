import { RuleEvaluator, ValidationError, ValidationRule } from 'src/core/types'
import { Data, Schema } from 'src/object/typed'
import { evalRule } from 'src/core/RuleEvaluator'

const testEntry = (
    ruleEval: RuleEvaluator,
    rules: ValidationRule<any>[],
    val: any
): ValidationError[] => {
    // TODO support for early exit
    const errors: ValidationError[] = []

    rules.forEach(r => {
        const err = ruleEval(r, val)
        if (err) errors.push(err)
    })

    return errors
}


const schemaToString = (s: Schema): string => {

    // TODO implement
    return `Object with keys: ${Object.keys(s).toString()}`
}

export const matchesSchema = (schema: Schema): ValidationRule<Data> => {
    const ruleEval = evalRule

    return {
        name: 'matches-schema',
        test: (data?: Data) => {
            if (!data)
                return {
                    passed: true
                }

            const errors: { attr: string, errors: ValidationError[] }[] = []

            Object.entries(schema).forEach(([key, rules]) => {
                const value = data[key]
                const propErrors = testEntry(ruleEval, rules, value)

                if (propErrors.length > 0) {
                    errors.push({ attr: key, errors: propErrors })
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
