import { RuleMap } from 'src'

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
