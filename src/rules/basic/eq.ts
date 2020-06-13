import { EqRuleConst } from 'types'

const code = 'revalid/rule/basic/eq'

export const eq: EqRuleConst = confVal => ({
    code,
    test: val => {
        if (val == null) return null
        return val === confVal ? null : 'is not equal'
    }
})
eq.code = code
