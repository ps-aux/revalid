import { ValidationRule } from 'src'

export const compose = (
    rules: ValidationRule<any, any>[],
    name?: string
): ValidationRule<any, any> => {
    if (!name) {
        name = rules.map(r => r.name).join(' & ')
    }

    const test = rules.reduce(
        (acc, r) => {
            return v => {
                acc(r)
                r.test(v)
            }
        },
        (x => {}) as (a?: any) => void
    ) as (a?: any) => void

    return {
        name,
        test
    }
}
