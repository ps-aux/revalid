import {
    notEmpty,
    notNull,
    constant,
    eq,
    regex,
    string,
    number,
    boolean,
    decimal,
    integer,
    isoDate,
    listOf,
    oneOf,
    obj,
    objectValidator,
    composeRules
} from 'src'

const imports = [
    notEmpty,
    notNull,
    constant,
    regex,
    eq,
    string,
    number,
    boolean,
    decimal,
    integer,
    isoDate,
    oneOf,
    listOf,
    obj,
    objectValidator,
    composeRules
]

it('declared imports are defined', () => {
    imports.forEach(i => {
        expect(i).toBeDefined()
    })
})
