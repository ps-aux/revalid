import { AnyErrDetail, ValidationError, ValidationRule } from '../../core/types'

export type SchemaErrorDetail = {
    attr: string
    value: any
    errors: ValidationError<AnyErrDetail>[]
}[]

export type Data = { [key: string]: any }

export type RuleMap = { [key: string]: ValidationRule<any, AnyErrDetail>[] }

export type ObjRule = ValidationRule<Data, SchemaErrorDetail>

export type ObjRuleConst = {
    code: string
    (schema: RuleMap): ObjRule
}
