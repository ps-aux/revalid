import { constantRuleType } from 'types'

export const constant: constantRuleType = val => ({
    name: `constant-${val}`,
    test: () => {
        const passed = val
        return {
            passed
        }
    }
})
