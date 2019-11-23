import { RuleEvaluator, ValidationRule } from 'src/core/types'

export const evalRule: RuleEvaluator = <A>(rule: ValidationRule<A>, data: A) => {
    const res = rule.test(data)

    if (res.passed) return null

    const err = res.error
    return {
        code: rule.name,
        message: err ? err!.message : `Does not passes rule ${rule.name}`,
        detail: err && err!.detail
    }
}
