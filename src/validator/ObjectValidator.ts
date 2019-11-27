import { matchesSchema } from 'src/rule-impl/object/matchesSchema'
import { ObjectSchema, ObjectValidator, Schema, ValidationErrors } from 'types'


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
