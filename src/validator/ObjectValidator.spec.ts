import {
    createObjectValidator,
    obj,
    required
} from 'src/validator/ObjectValidator'
import { ValidationRule } from 'types'
import { notNull } from 'src/rule-impl/basic-rules/notNull'

const mustBe = (val: any): ValidationRule<any, any> => ({
    name: `must-be-${val}`,
    code: 'any',
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
            b: [mustBe('abc')],
            c: [obj({}), notNull()],
            d: required({}),
            e: {
                a: [notNull()]
            }
        })

        const res = sut({
            b: 456,
            e: {}
        })

        console.log('errors', JSON.stringify(res, null, 4))

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
            },
            c: {
                errors: [
                    {
                        code: 'not-null'
                    }
                ]
            },
            d: {
                errors: [
                    {
                        code: 'not-null & matches-schema'
                    }
                ]
            },
            e: {
                errors: [
                    {
                        code: 'matches-schema',
                        detail: [
                            {
                                attr: 'a',
                                errors: [
                                    {
                                        code: 'not-null'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        })
    })
})
