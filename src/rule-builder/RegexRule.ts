import { RegexRuleBuilder } from 'src/rule-builder/types'

export const RegexRule: RegexRuleBuilder = ({ name, regex }) => ({
    test: val => {
        // No value is treated as valid
        let passed: boolean

        if (val == null) passed = true
        else {
            if (typeof val !== 'string')
                throw new Error(`${val} is not a string. Cannot test regex.`)
            passed = val.match(regex) != null
        }

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
