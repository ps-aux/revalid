import { createObjectValidator } from 'src/validator/ObjectValidator'
import { ValidationRule } from 'src/core/types'

const mustBe = (val: any): ValidationRule<any, any> => ({
    name: `must-be-${val}`,
    test: x => {
        const passed = x === val

        return {
            passed,
            error: passed
                ? undefined
                : {
                    message: x + 'is-not' + val,
                    detail: 'detail'
                }
        }
    }
})

describe('Validator', () => {
    it('basic test case', () => {
        const sut = createObjectValidator({
            a: mustBe(3),
            b: [mustBe('abc')]
        })

        const res = sut({
            b: 456
        })!

        console.log('res', res)
        expect(res).toMatchObject({
            a: { code: 'is-not', value: undefined, detail: 'detail' },
            b: { code: 'is-not', value: 456, detail: 'detail' }
        })
    })
})
