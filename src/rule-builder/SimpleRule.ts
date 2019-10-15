import { SimpleRuleBuilder } from 'src/rule-builder/types'

export const rule = ({ test, code }) => (ops?: any) => val => {
    if (val == null) return false

    return test(val, ops) ? false : code
}

export const regexRule = ({ regex, code }) =>
    rule({
        test: v => regex.test(v),
        code
    })

export const SimpleRule: SimpleRuleBuilder = ({ name, holds }) => ({
    test: val => {
        // No value is treated as valid
        const passed = val == null ? true : holds(val)

        if (passed) {
            return {
                passed: true
            }
        }

        return {
            passed: false,
            error: {
                code: name
            }
        }
    }
})
