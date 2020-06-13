import { ValidationRule } from '../../core/types'
import { RuleConstructor } from '../core/types'

export type OneOfRuleConst = RuleConstructor<
    string | number,
    {
        message: string
        values: (string | number)[]
    },
    (string | number)[]
>

export type ListOfRuleErrorDetail = {
    index: number
    item: any
    error: any
} | null // If object is not a list

export type ListOfRule = ValidationRule<any[], ListOfRuleErrorDetail>

export type ListOfRuleConst_ = {
    code: string
    (rule: ValidationRule<any, any>): ListOfRule
}

export type ListOfRuleConst = RuleConstructor<
    any[],
    {
        index: number
        item: any
        error: {
            code: string
            error: any
        }
    },
    ValidationRule<any, any>
>
