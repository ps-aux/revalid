import { oneOfRuleConst } from 'types'

export const oneOf: oneOfRuleConst = vals => {
    const str = `[${vals.join(',')}]`

    vals.forEach(v => {
        if (!['number', 'string'].includes(typeof v)) {
            throw new Error('Input of oneOf can be only number or string')
        }
    })

    return {
        name: `one-of-${str}`,
        test: (val?: any) => {
            if (val == null)
                return {
                    passed: true
                }
            const passed = vals.includes(val)

            return {
                passed,
                error: passed
                    ? undefined
                    : {
                          message: `${val} is not one of ${str}`,
                          detail: vals
                      }
            }
        }
    }
}
