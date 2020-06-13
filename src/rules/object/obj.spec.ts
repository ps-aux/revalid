import { number, string } from 'src/rules/type/simpleTypeRules'
import { notNull } from 'src/rules/basic/notNull'
import { notEmpty } from 'src/rules/basic/notEmpty'
import { listOf } from 'src/rules/container/listOf'
import { obj } from 'src/rules/object/obj'
import { evalRule } from '../../core'

// TODO fragile test
describe('matchesSchema', () => {
    it('basic case', () => {
        const rule = obj({
            foo: [notNull(), string()],
            bar: [notNull(), number()],
            baz: [notNull(), string()],
            child: [
                obj({
                    name: [notEmpty()]
                })
            ],
            items: [
                listOf(
                    obj({
                        foo: [notNull()]
                    })
                )
            ]
        })

        const r = rule.test(
            {
                foo: 'abc',
                bar: 'not-number',
                // baz missing
                child: {},
                items: [{}]
            },
            evalRule
        )

        // TODO use partial matching
        expect(r).toMatchObject([
            {
                attr: 'bar',
                value: 'not-number',
                errors: [
                    {
                        code: number.code,
                        error: 'is not of type number'
                    }
                ]
            },
            {
                attr: 'baz',
                errors: [
                    {
                        code: notNull.code,
                        error: 'cannot be null'
                    }
                ]
            },
            {
                attr: 'items',
                value: [{}],
                errors: [
                    {
                        code: listOf.code,
                        error: {
                            index: 0,
                            item: {},
                            error: {
                                code: obj.code,
                                error: [
                                    {
                                        attr: 'foo',
                                        errors: [
                                            {
                                                code: notNull.code,
                                                error: 'cannot be null'
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        ])
    })
})
