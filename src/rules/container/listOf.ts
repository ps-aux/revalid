import { ListOfRuleConst } from 'src'

const code = 'revalid/rule/container/list-of'

export const listOf: ListOfRuleConst = rule => {
    return {
        code,
        test: (val, evalRule) => {
            if (val == null) return null

            if (!Array.isArray(val)) throw new Error('Object is not an array')

            for (let i = 0; i < val.length; i++) {
                const item = val[i]

                const error = rule.test(item, evalRule)

                if (error) {
                    return {
                        index: i,
                        item: item,
                        error: {
                            code: rule.code,
                            error
                        }
                    }
                }
            }

            return null
        }
    }
}

listOf.code = code
