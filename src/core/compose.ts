import { ValidationRule } from 'src'

export const compose = (
    rules: ValidationRule<any, any>[],
    name?: string
): ValidationRule<any, any> => {
    if (!name) {
        name = rules.map(r => r.name).join(' & ')
    }

    return {
        name,
        test: (v?: any) => {
            for (const r of rules) {
                const res = r.test(v)

                if (!res.passed) return res
            }

            return {
                passed: true
            }
        }
    }
}
