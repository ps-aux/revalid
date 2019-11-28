import { createObjectValidator } from 'src/validator/ObjectValidator'
import { ValidationRule } from 'types'

const mustBe = (val: any): ValidationRule<any, any> => ({
    name: `must-be-${val}`,
    test: x => {
        const passed = x === val

        return {
            passed,
            error: passed
                ? undefined
                : {
                      message: 'is not',
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

        expect(res).toMatchObject({
            a: {
                value: undefined,
                errors: [
                    {
                        code: 'must-be-3',
                        message: 'is not',
                        detail: 'detail'
                    }
                ]
            },
            b: {
                value: 456,
                errors: [
                    {
                        code: 'must-be-abc',
                        message: 'is not',
                        detail: 'detail'
                    }
                ]
            }
        })
    })
})
