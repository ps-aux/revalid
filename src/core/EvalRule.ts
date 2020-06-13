import { EvalRule, ValidationRule } from 'types'

export const evalRule: EvalRule = <Input, Err>(
    rule: ValidationRule<Input, Err>,
    input: Input
) => {
    const error = rule.test(input, evalRule)

    if (!error) return null

    return {
        code: rule.code,
        error
    }
}
