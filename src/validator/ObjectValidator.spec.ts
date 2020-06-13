import { notNull } from 'src/rules/basic/notNull'
import { objectValidator } from './ObjectValidator'
import { obj } from 'src/rules/object/obj'
import { listOf } from 'src/rules/container/listOf'
import { ValidationRule } from 'types'

const myCode = 'must-be'
const mustBe = (val: any): ValidationRule<any, any> => ({
    code: myCode,
    test: x => {
        const passed = x === val

        if (passed) return null

        return 'my-error'
    }
})

// TODO duplicated test with obj()
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

        const res = sut.validate({
            b: [456],
            e: {}
        })

        expect(res).toMatchObject({
            a: {
                value: undefined,
                errors: [
                    {
                        code: myCode
                    }
                ]
            },
            b: {
                value: [456],
                errors: [
                    {
                        code: listOf.code
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
                value: {},
                errors: [
                    {
                        code: obj.code
                    }
                ]
            }
        })
    })
})
