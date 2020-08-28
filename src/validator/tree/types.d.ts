import { ObjectData, ValidationError, ValidationRule } from '../../../types'

export type TreeOf<T> = {
    [key: string]: T | TreeOf<T>
}

export type TreeValidationErrorResult = TreeOf<ValidationError[]>

export type TreeValidationSchema = TreeOf<ValidationRule<any, any>[]>

export type TreeValidator = {
    validate: (data: ObjectData) => TreeValidationErrorResult | null
}

export type CreateTreeValidator = (
    schema: TreeValidationSchema
) => TreeValidator
