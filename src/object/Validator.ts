import { Data, ValidationError, ValidationErrors, ValidationSchema, Validator } from 'src/validator/types'


const validate = (schema: ValidationSchema, data: Data): [string, ValidationError][] => {
    const errors: [string, ValidationError][] = []

    Object.entries(schema)
        .forEach(([key, rule]) => {
            const value = data[key]

            const res = rule.test(value)
            if (res.passed)
                return

            const err = res.error!
            errors.push([key, {
                code: err.code,
                value,
                detail: err.detail
            }])
        })

    return errors

}

export const createValidator: Validator = schema => {
    return data => {
        const res: ValidationErrors = {}
        validate(schema, data).forEach(err => {
            res[err[0]] = err[1]
        })
        return res
    }
}
