import { createValidator } from 'src/validator/Validator'
import { ValidationRule } from 'src/validator/types'

const mustBe = (val: any): ValidationRule => ({
    test: x => {
        const passed = x === val

        return {
            passed,
            error: passed
                ? undefined
                : {
                      code: 'is-not',
                      detail: 'detail'
                  }
        }
    }
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
            a: { code: 'is-not', value: undefined, detail: 'detail' },
            b: { code: 'is-not', value: 456, detail: 'detail' }
        })
    })
})
