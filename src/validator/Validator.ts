import { Data, ValidationError, ValidationErrors, ValidationSchema, Validator } from 'src/validator/types'


const validate = (schema: ValidationSchema, data: Data): [string, ValidationError][] => {
    const errors: [string, ValidationError][] = []

    Object.entries(schema)
        .forEach(([key, rule]) => {
            const value = data[key]

            const res = rule.test(value)
            if (res.passed)
                return

            errors.push([key, {
                code: rule.name,
                value,
                detail: res.detail
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
