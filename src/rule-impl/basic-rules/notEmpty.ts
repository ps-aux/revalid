import { RuleConstructor } from 'src/rule/types'

export const notEmpty: RuleConstructor<string> = () => ({
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
