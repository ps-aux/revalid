import { ConfRuleConstructor } from 'src/rule-constructor/types'

export const regex: ConfRuleConstructor<string, void, RegExp> = regex => ({
    name: 'matches-regex',
    test: (val?: string) => {
        if (val == null)
            return {
                passed: true
            }
        if (typeof val !== 'string')
            throw new Error(`${val} is not a string. Cannot test regex.`)

        return {
            passed: val.match(regex) != null
        }
    }
})
