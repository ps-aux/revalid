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

export type WithCode = {
    code: string
}

export type ValidationRule<A, ErrDetail> = {
    name: string
    code: string
    test: (val?: A) => ValidationTestResult<ErrDetail>
}

// Rule construction

export type RuleConstructor<A, ErrDetail> = {
    (): ValidationRule<A, ErrDetail>
}

export type ConfRuleConstructor<A, ErrDetail, Config> = {
    (conf: Config): ValidationRule<A, ErrDetail>
}

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
export type NotNullRuleConst = RuleConstructor<any, any> & WithCode

export declare const notNull: NotNullRuleConst

export type NotEmptyRuleConst = RuleConstructor<string, any> & WithCode

export declare const notEmpty: NotEmptyRuleConst

export type RegexRuleConst = ConfRuleConstructor<string, void, RegExp> &
    WithCode

export declare const regex: RegexRuleConst

export type ConstantRuleType = ConfRuleConstructor<any, void, boolean> &
    WithCode

export declare const constant: ConstantRuleType

// Types
export type TypeRuleRuleConstructor = RuleConstructor<any, any> & WithCode

export declare const string: TypeRuleRuleConstructor

export declare const boolean: TypeRuleRuleConstructor

export declare const decimal: TypeRuleRuleConstructor

export declare const integer: TypeRuleRuleConstructor

export declare const number: TypeRuleRuleConstructor

export declare const isoDate: TypeRuleRuleConstructor

// Container

export type oneOfRuleConst = {
    code: string
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
