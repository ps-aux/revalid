import { AnyErrDetail, ValidationRule } from '../../core/types'

export type OneOfRuleConst = {
    code: string
    (vals: (string | number)[]): ValidationRule<string | number, AnyErrDetail>
}

export type ListOfRuleErrorDetail = {
    index: number
    item: any
    error: any
} | null // If object is not a list

export type ListOfRule = ValidationRule<any[], ListOfRuleErrorDetail>

export type ListOfRuleConst = {
    code: string
    (rule: ValidationRule<any, any>): ListOfRule
}
