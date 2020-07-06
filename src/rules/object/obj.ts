import {
    AttrError,
    EvalRule,
    ObjRuleConst,
    ValidationError,
    ValidationRule
} from '../../../types'

const testEntry = (
    ruleEval: EvalRule,
    rules: ValidationRule<any, any>[],
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

const code = 'revalid/rule/object/matches-schema'

export const obj: ObjRuleConst = schema => {
    return {
        code,
        test: (data, evalRule) => {
            if (!data) return null

            if (Array.isArray(data)) {
                throw new Error('Input is an array not an object')
            }

            const errors: AttrError[] = []

            Object.entries(schema).forEach(([key, rules]) => {
                const value = data[key]
                const propErrors = testEntry(evalRule, rules, value)

                if (propErrors.length > 0) {
                    errors.push({
                        attr: key,
                        value: value,
                        errors: propErrors
                    })
                }
            })

            if (errors.length === 0) return null

            return errors
        }
    }
}

obj.code = code
