import { ValidationError, ValidationSchema } from '../../types'

export type ObjectData = { [key: string]: any }

export type ObjectValidationErrorResult = {
    [key: string]: {
        value: any
        errors: ValidationError[]
    }
}

export type ObjectValidator = {
    validate: (data: ObjectData) => ObjectValidationErrorResult | null
}

export type CreateObjectValidator = (
    schema: ValidationSchema
) => ObjectValidator
