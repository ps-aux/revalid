import { RuleConstructor } from 'src/rule-constructor/types'

export const notEmpty: RuleConstructor<string, void> = () => ({
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
