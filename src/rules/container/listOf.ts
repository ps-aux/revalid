import { ListOfRuleConst } from 'src'

const code = 'revalid/rule/container/list-of'

export const listOf: ListOfRuleConst = rule => {
    return {
        name: `list-of-${rule.name}`,
        code,
        test: val => {
            if (val == null)
                return {
                    passed: true
                }

            if (!Array.isArray(val)) {
                return {
                    passed: false,
                    error: {
                        message: 'Object is not an array',
                        detail: null
                    }
                }
            }

            for (let i = 0; i < val.length; i++) {
                const item = val[i]

                const res = rule.test(item)
                if (!res.passed) {
                    return {
                        passed: false,
                        error: {
                            message: `Item at index ${i} does not pass rule ${rule.name}`,
                            detail: {
                                item,
                                index: i,
                                error: res.error
                            }
                        }
                    }
                }
            }

            return {
                passed: true
            }
        }
    }
}

listOf.code = code
