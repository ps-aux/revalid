import { notNull } from 'src/rule-impl/basic-rules/notNull'
import { ValidationRule } from 'src'
import { objectValidator } from './ObjectValidator'
import { obj } from 'src/rule-impl/object/obj'
import { listOf } from 'src/rule-impl/container-rules/listOf'

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
        const sut = objectValidator({
            a: [mustBe(3)],
            b: [listOf(mustBe('abc'))],
            c: [obj({}), notNull()],
            d: [notNull(), obj({})],
            e: [
                obj({
                    a: [notNull()]
                })
            ]
        })

        const res = sut({
            b: [456],
            e: {}
        })

        // console.log('errors', JSON.stringify(res, null, 4))

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
                value: [456],
                errors: [
                    {
                        code: 'list-of-must-be-abc',
                        message:
                            'Item at index 0 does not pass rule must-be-abc'
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
                        code: 'not-null'
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
