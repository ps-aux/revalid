import { ComposeRulesFun } from 'src/core/types'
import {
    ConstantRuleType,
    EqRuleConst,
    ListOfRuleConst,
    NotEmptyRuleConst,
    NotNullRuleConst,
    ObjRuleConst,
    OneOfRuleConst,
    RegexRuleConst,
    TypeRuleRuleConstructor
} from './src/rules/types'
import { CreateObjectValidator } from './src/validator/types'

export * from 'src/core/types'
export * from './src/rules/types'
export * from './src/validator/types'

// Object validator

export declare const objectValidator: CreateObjectValidator

// Basic

export declare const notNull: NotNullRuleConst

export declare const notEmpty: NotEmptyRuleConst

export declare const regex: RegexRuleConst

export declare const constant: ConstantRuleType

// Types

export declare const eq: EqRuleConst

export declare const string: TypeRuleRuleConstructor

export declare const boolean: TypeRuleRuleConstructor

export declare const decimal: TypeRuleRuleConstructor

export declare const integer: TypeRuleRuleConstructor

export declare const number: TypeRuleRuleConstructor

export declare const isoDate: TypeRuleRuleConstructor

// Container

export declare const oneOf: OneOfRuleConst

export declare const listOf: ListOfRuleConst

// Object

export declare const obj: ObjRuleConst

// Compose

export declare const composeRules: ComposeRulesFun
