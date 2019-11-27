import { notNullRuleConst } from 'types'

export const notNull: notNullRuleConst = () => ({
    name: 'not-null',
    test: (v?: any) => {
        if (v === null || v === undefined)
            return {
                passed: false
            }

        return {
            passed: true
        }
    }
})
