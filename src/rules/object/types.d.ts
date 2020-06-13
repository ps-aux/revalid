import { ValidationError, ValidationRule } from '../../core/types'
import { RuleConstructor } from '../core/types'

export type AttrError = {
    attr: string
    value: any
    errors: ValidationError[]
}

export type Data = { [key: string]: any }

export type ValidationSchema = { [key: string]: ValidationRule<any, any>[] }

export type ObjRuleConst = RuleConstructor<Data, AttrError[], ValidationSchema>
