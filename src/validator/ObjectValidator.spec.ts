import { notNull } from 'src/rules/basic-rules/notNull'
import { objectValidator } from './ObjectValidator'
import { obj } from 'src/rules/object/obj'
import { listOf } from 'src/rules/container-rules/listOf'
import { ValidationRule } from 'types'

const mustBe = (val: any): ValidationRule<any, any> => ({
    name: `must-be-${val}`,
    code: 'must-be',
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
                        code: 'must-be',
                        message: 'is not',
                        detail: 'detail'
                    }
                ]
            },
            b: {
                value: [456],
                errors: [
                    {
                        code: listOf.code,
                        message:
                            'Item at index 0 does not pass rule must-be-abc'
                    }
                ]
            },
            c: {
                errors: [
                    {
                        code: notNull.code
                    }
                ]
            },
            d: {
                errors: [
                    {
                        code: notNull.code
                    }
                ]
            },
            e: {
                errors: [
                    {
                        code: obj.code,
                        detail: [
                            {
                                attr: 'a',
                                errors: [
                                    {
                                        code: notNull.code
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
