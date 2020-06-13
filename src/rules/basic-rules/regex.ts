import { RegexRuleConst } from 'types'

const code = 'revalid/rule/basic/regex'

export const regex: RegexRuleConst = regex => ({
    name: 'matches-regex',
    code,
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

regex.code = code
