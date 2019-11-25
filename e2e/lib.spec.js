const { createObjectValidator, notNull } = require('@ps-aux/revalid')

it('import works', () => {
    const validate = createObjectValidator({
        a: [notNull()]
    })

    const r = validate({})

    expect(r).toMatchObject({
        a: {
            value: undefined
        }
    })
})
