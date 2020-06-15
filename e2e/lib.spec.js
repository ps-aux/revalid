const { objectValidator, notNull } = require('@ps-aux/revalid')

it('imports work', () => {
    const val = objectValidator({
        a: [notNull()]
    })

    const r = val.validate({})

    expect(r).toMatchObject({
        a: {
            value: undefined
        }
    })
})
