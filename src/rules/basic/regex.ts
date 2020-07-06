import { RegexRuleConst } from './types'

const code = 'revalid/rule/basic/regex'

export const regex: RegexRuleConst = regex => ({
    code,
    test: val => {
        if (val == null) return null
        if (typeof val !== 'string')
            throw new Error(`${val} is not a string. Cannot test regex.`)

        const matches = val.match(regex) != null

        if (matches) return null

        return `${val} does not match ${regex}`
    }
})

regex.code = code
