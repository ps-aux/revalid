import { ConstantRuleType } from './types'

const code = 'revalid/rule/basic/constant'

export const constant: ConstantRuleType = shouldPass => ({
    code,
    test: val => {
        if (val == null) return null

        return shouldPass ? null : 'will never pass'
    }
})

constant.code = code
