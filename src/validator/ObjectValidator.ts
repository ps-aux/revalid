import { Schema } from 'src/rule-impl/object/typed'
import { matchesSchema } from 'src/rule-impl/object/matchesSchema'
import { ValidationRule } from 'src/core/types'

export type ObjectData = { [key: string]: any }

export type ObjectSchema = {
    [key: string]: ValidationRule<any, any> | ValidationRule<any, any>[]
}

export type ValidationError = {
    code: string
    message: string
    detail: any
}

export type ValidationErrors = {
    [key: string]: {
        value: any
        errors: ValidationError[]
    }
}

export type ObjectValidator = (data: ObjectData) => ValidationErrors | null

const ensureArray = <A>(a: A | A[]): A[] => {
    if (Array.isArray(a)) return a
    return [a]
}

export const createObjectValidator = (
    objSchema: ObjectSchema
): ObjectValidator => {
    return d => {
        const s: Schema = {}

        Object.entries(objSchema).forEach(([key, val]) => {
            s[key] = ensureArray(val)
        })

        const rule = matchesSchema(s)

        const res = rule.test(d)

        if (res.passed) return null

        const errors = res.error!.detail

        const errRes: ValidationErrors = {}

        errors.forEach(err => {
            errRes[err.attr] = {
                value: err.value,
                errors: err.errors
            }
        })

        return errRes
    }
}
