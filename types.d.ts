import { AnyErrDetail, ValidationError, ValidationRule } from './src/core-types'
import {
    ConstantRuleType,
    EqRuleConst,
    NotEmptyRuleConst,
    NotNullRuleConst,
    RegexRuleConst,
    TypeRuleRuleConstructor
} from './src/rules/basic-rules/types'

export {
    AnyErrDetail,
    ValidationError,
    ValidationRule,
    RuleEvaluator
} from './src/core-types'
export {
    ConstantRuleType,
    EqRuleConst,
    NotEmptyRuleConst,
    NotNullRuleConst,
    RegexRuleConst,
    TypeRuleRuleConstructor
} from './src/rules/basic-rules/types'

// Object validation rule

export type SchemaErrorDetail = {
    attr: string
    value: any
    errors: ValidationError<AnyErrDetail>[]
}[]

export type Data = { [key: string]: any }

export type RuleMap = { [key: string]: ValidationRule<any, AnyErrDetail>[] }

// Object validator

export type ObjectData = { [key: string]: any }

export type AttrValidationError = {
    code: string
    message: string
    detail: any
}

export type ObjectValidationErrors = {
    [key: string]: {
        value: any
        errors: AttrValidationError[]
    }
}

export type ObjectValidator = (
    data: ObjectData
) => ObjectValidationErrors | null

export type CreateObjectValidator = (schema: RuleMap) => ObjectValidator

export declare const objectValidator: CreateObjectValidator

// Rules impl

// Basic

export declare const notNull: NotNullRuleConst

export declare const notEmpty: NotEmptyRuleConst

export declare const regex: RegexRuleConst

export declare const constant: ConstantRuleType

export declare const eq: EqRuleConst

export declare const string: TypeRuleRuleConstructor

export declare const boolean: TypeRuleRuleConstructor

export declare const decimal: TypeRuleRuleConstructor

export declare const integer: TypeRuleRuleConstructor

export declare const number: TypeRuleRuleConstructor

export declare const isoDate: TypeRuleRuleConstructor

// Container

export type oneOfRuleConst = {
    code: string
    (vals: (string | number)[]): ValidationRule<string | number, AnyErrDetail>
}

export declare const oneOf: oneOfRuleConst

export type ListOfRuleErrorDetail = {
    index: number
    item: any
    error: any
} | null // If object is not a list

export type ListOfRule = ValidationRule<any[], ListOfRuleErrorDetail>

export type listOfRuleConst = {
    code: string
    (rule: ValidationRule<any, any>): ListOfRule
}

export declare const listOf: listOfRuleConst

export type ObjRule = ValidationRule<Data, SchemaErrorDetail>

export type ObjRuleConst = {
    code: string
    (schema: RuleMap): ObjRule
}

export declare const obj: ObjRuleConst

// Compose
export declare type composeRulesFun = (
    rules: ValidationRule<any, AnyErrDetail>[],
    name?: string
) => ValidationRule<any, AnyErrDetail>

export declare const composeRules: composeRulesFun
