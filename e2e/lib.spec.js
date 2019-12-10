const { objectValidator, notNull } = require('@ps-aux/revalid')

it('imports work', () => {
    const validate = objectValidator({
        a: [notNull()]
    })

    const r = validate({})

    expect(r).toMatchObject({
        a: {
            value: undefined
        }
    })
})
