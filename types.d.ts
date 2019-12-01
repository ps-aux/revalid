// Core

export type ValidationTestResult<ErrDetail> = {
    passed: boolean
    error?: {
        message: string
        detail: ErrDetail
    }
}

export type ValidationError<ErrDetail> = {
    code: string
    message: string
    detail: ErrDetail
}

export type RuleEvaluator = {
    <A, ErrDetail>(
        rule: ValidationRule<A, ErrDetail>,
        data: A
    ): ValidationError<ErrDetail> | null
}

export type ValidationRule<A, ErrDetail> = {
    name: string
    test: (val?: A) => ValidationTestResult<ErrDetail>
}

// Rule construction

export type RuleConstructor<A, ErrDetail> = () => ValidationRule<A, ErrDetail>

export type ConfRuleConstructor<A, ErrDetail, Config> = (
    conf: Config
) => ValidationRule<A, ErrDetail>

// Object validation rule

export type SchemaErrorDetail = {
    attr: string
    value: any
    errors: ValidationError<any>[]
}[]

export type Data = { [key: string]: any }

export type RuleMap = { [key: string]: ValidationRule<any, any>[] }

// Object validator

export type ObjectSchema = {
    [key: string]:
        | ValidationRule<any, any>
        | ValidationRule<any, any>[]
        | ObjectSchema
}

export type ObjectData = { [key: string]: any }

export type DataValidationError = {
    code: string
    message: string
    detail: any
}

export type ValidationErrors = {
    [key: string]: {
        value: any
        errors: DataValidationError[]
    }
}

export type ObjectValidator = (data: ObjectData) => ValidationErrors | null

export declare const Validator: (objSchema: ObjectSchema) => ObjectValidator

// Rules impl

// Basic
export type notNullRuleConst = RuleConstructor<any, any>

export declare const notNull: notNullRuleConst

export type notEmptyRuleConst = RuleConstructor<string, any>

export declare const notEmpty: notEmptyRuleConst

export type constantRuleType = ConfRuleConstructor<any, void, boolean>

export declare const constant: constantRuleType

// Types
export type TypeRuleRuleConstructor = RuleConstructor<any, any>

export declare const string: TypeRuleRuleConstructor

export declare const boolean: TypeRuleRuleConstructor

export declare const decimal: TypeRuleRuleConstructor

export declare const integer: TypeRuleRuleConstructor

export declare const number: TypeRuleRuleConstructor

export declare const isoDate: TypeRuleRuleConstructor

// Container

export type oneOfRuleConst = {
    (vals: (string | number)[]): ValidationRule<string | number, any>
}

export declare const oneOf: oneOfRuleConst

// Object
export type ObjRuleRuleConstructor = ConfRuleConstructor<
    Data,
    SchemaErrorDetail,
    ObjectSchema
>

export declare const obj: ObjRuleRuleConstructor

export declare const required: ObjRuleRuleConstructor

// Compose
export declare type composeRulesFun = (
    rules: ValidationRule<any, any>[],
    name?: string
) => ValidationRule<any, any>

export declare const composeRules: composeRulesFun
