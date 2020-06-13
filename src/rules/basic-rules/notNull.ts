import { NotNullRuleConst } from 'types'

const code = 'revalid/rule/basic/not-null'

export const notNull: NotNullRuleConst = () => ({
    name: 'not-null',
    code,
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

notNull.code = code
