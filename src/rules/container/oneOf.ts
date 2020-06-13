import { OneOfRuleConst } from 'types'

const code = 'revalid/rule/container/one-of'

export const oneOf: OneOfRuleConst = vals => {
    const str = `[${vals.join(',')}]`

    vals.forEach(v => {
        if (!['number', 'string'].includes(typeof v)) {
            throw new Error('Input of oneOf can be only number or string')
        }
    })

    return {
        code,
        test: val => {
            if (val == null) return null
            const passed = vals.includes(val)

            if (passed) return null

            return {
                message: `${val} is not one of ${str}`,
                values: vals
            }
        }
    }
}

oneOf.code = code
