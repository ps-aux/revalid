import {
    ObjectValidationErrorResult,
    ObjectValidator,
    ValidationSchema
} from 'types'
import { obj } from 'src/rules/object/obj'
import { evalRule } from '../core'

export const objectValidator = (def: ValidationSchema): ObjectValidator => {
    const validator = {
        validate: d => {
            // TODO if we want less verbose api we can transform more user friendly input into def here
            const rule = obj(def)

            const errors = rule.test(d, evalRule)

            if (!errors) return null

            const errRes: ObjectValidationErrorResult = {}

            errors.forEach(err => {
                errRes[err.attr] = {
                    value: err.value,
                    errors: err.errors
                }
            })

            return errRes
        }
    }

    return validator
}
