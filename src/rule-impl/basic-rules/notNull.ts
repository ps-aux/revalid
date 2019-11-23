import { RuleConstructor } from 'src/rule-constructor/types'

export const notNull: RuleConstructor<string, void> = () => ({
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
