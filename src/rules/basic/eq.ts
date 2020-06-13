import { EqRuleConst } from 'types'

const code = 'revalid/rule/basic/eq'

export const eq: EqRuleConst = confVal => ({
    name: `equal-to-${confVal}`,
    code,
    test: val => {
        if (val == null)
            return {
                passed: true
            }
        const passed = val === confVal
        return {
            passed,
            error: {
                message: `Is not equal to ${val}`,
                detail: undefined
            }
        }
    }
})

eq.code = code
