import { createValidator } from 'src/validator/Validator'
import { ValidationRule } from 'src/validator/types'

const mustBe = (val: any): ValidationRule => ({
    test: x => ({
        passed: x === val,
        detail: x !== val ? 'detail' : null
    }),
    name:
        `must be ${val}`
})

describe('Validator', () => {
    it('basic test case', () => {


        const sut = createValidator({
            a: mustBe(3),
            b: mustBe('abc')
        })

        const res = sut({
            b: 456
        })

        expect(res).toMatchObject({
            a: { code: 'must be 3', value: undefined, detail: 'detail' },
            b: { code: 'must be abc', value: 456, detail: 'detail' }
        })
    })


})
