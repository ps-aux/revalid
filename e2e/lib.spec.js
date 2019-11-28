const { Validator } = require('@ps-aux/revalid')
const { notNull } = require('@ps-aux/revalid')

// const { notNull } = require('@ps-aux/revalid/lib/rules')

it('import works', () => {
    const validate = Validator({
        a: [notNull()]
    })

    const r = validate({})

    expect(r).toMatchObject({
        a: {
            value: undefined
        }
    })
})
