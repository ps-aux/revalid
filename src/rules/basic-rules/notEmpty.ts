import { NotNullRuleConst } from 'types'

const code = 'revalid/rule/basic/not-empty'

export const notEmpty: NotNullRuleConst = () => ({
    name: 'not-empty',
    code,
    test: (s?: string) => {
        if (s && s.length > 0)
            return {
                passed: true
            }
        return {
            passed: false
        }
    }
})

notEmpty.code = code
