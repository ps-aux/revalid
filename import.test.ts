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
    evalRule
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
    evalRule
]

it('declared imports are defined', () => {
    imports.forEach(i => {
        expect(i).toBeDefined()
    })
})
