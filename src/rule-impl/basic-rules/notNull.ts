import { RuleConstructor } from 'src/rule/types'

export const notNull: RuleConstructor<string> = () => ({
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
