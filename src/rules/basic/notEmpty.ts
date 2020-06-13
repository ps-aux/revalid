import { NotEmptyRuleConst } from 'types'

const code = 'revalid/rule/basic/not-empty'

export const notEmpty: NotEmptyRuleConst = () => ({
    code,
    test: val => {
        if (val == null) return null
        if (val.length === undefined)
            throw new Error('Object does not have length')
        if (val.length > 0) return null

        return 'is empty'
    }
})

notEmpty.code = code
