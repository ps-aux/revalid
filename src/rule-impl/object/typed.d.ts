import { ValidationError, ValidationRule } from 'src/core/types'

export type SchemaErrorDetail = {
    attr: string,
    value: any,
    errors: ValidationError<any>[]
}[]


export type Data = { [key: string]: any }

export type Schema = { [key: string]: ValidationRule<any, any>[] }
