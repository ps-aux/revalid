import { CreateJsonValidator, ListSchema, ObjectSchema } from 'src'
import { objectValidator } from 'src/validator/ObjectValidator'
import { listValidator } from 'src/validator/ListValidator'

export const jsonValidator: CreateJsonValidator = schema => {
    let validator

    if (schema.type === 'list') {
        const listSchema = schema.schema as ListSchema
        validator = listValidator(listSchema)
    } else if (schema.type === 'object') {
        const listSchema = schema.schema as ObjectSchema
        validator = objectValidator(listSchema)
    } else {
        throw new Error(`Invalid schema type '${schema.type}'`)
    }

    return data => validator(data)
}
