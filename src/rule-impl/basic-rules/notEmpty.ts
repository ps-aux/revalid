import { notNullRuleConst } from 'types'

export const notEmpty: notNullRuleConst = () => ({
    name: 'not-empty',
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
