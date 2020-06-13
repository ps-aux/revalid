import { ObjectValidationErrors, ObjectValidator, RuleMap } from 'types'
import { obj } from 'src/rules/object/obj'

export const objectValidator = (def: RuleMap): ObjectValidator => {
    return d => {
        // TODO if we want less verbose api we can transform more user friendly input into def here
        const rule = obj(def)

        // @ts-ignore
        const res = rule.test(d)

        if (res.passed) return null

        const errors = res.error!.detail

        const errRes: ObjectValidationErrors = {}

        errors.forEach(err => {
            errRes[err.attr] = {
                value: err.value,
                errors: err.errors
            }
        })

        return errRes
    }
}
