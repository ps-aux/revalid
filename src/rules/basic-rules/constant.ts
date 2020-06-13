import { ConstantRuleType } from 'types'

const code = 'revalid/rule/basic/constant'

export const constant: ConstantRuleType = val => ({
    name: `constant-${val}`,
    code,
    test: () => {
        const passed = val
        return {
            passed
        }
    }
})

constant.code = code
