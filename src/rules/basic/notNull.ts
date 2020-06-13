import { NotNullRuleConst } from 'types'

const code = 'revalid/rule/basic/not-null'

export const notNull: NotNullRuleConst = () => ({
    code,
    test: v => {
        if (v === null || v === undefined) return 'cannot be null'

        return null
    }
})

notNull.code = code
