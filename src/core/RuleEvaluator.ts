import { RuleEvaluator, ValidationRule } from 'types'

export const evalRule: RuleEvaluator = <A, ErrDetail>(
    rule: ValidationRule<A, ErrDetail>,
    data: A
) => {
    const res = rule.test(data)

    if (res.passed) return null

    const err = res.error
    return {
        code: rule.code,
        message: err ? err!.message : `Does not pass rule '${rule.name}'`,
        // TODO
        detail: (err && err!.detail) as ErrDetail
    }
}
