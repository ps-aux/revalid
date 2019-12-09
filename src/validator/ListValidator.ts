import { CreateListValidator } from 'types'
import { objectValidator } from 'src/validator/ObjectValidator'

export const listValidator: CreateListValidator = schema => {
    const objValidator = objectValidator(schema.itemSchema)

    return (items?: any[]) => {
        if (!items) return null

        for (let i = 0; i < items.length; i++) {
            const value = items[i]
            const errors = objValidator(value)
            // TODO add option to validate whole list
            if (!errors) continue
            return {
                [i]: {
                    errors,
                    value
                }
            }
        }

        return null
    }
}
