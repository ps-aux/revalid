import { createObjectValidator } from 'src/validator/ObjectValidator'

export { notEmpty } from 'src/rule-impl/basic-rules/notEmpty'
export { notNull } from 'src/rule-impl/basic-rules/notNull'
export {
    string,
    boolean,
    decimal,
    integer,
    isoDate,
    number
} from 'src/rule-impl/type-rules/typeRule'

export { createObjectValidator as Validator }
