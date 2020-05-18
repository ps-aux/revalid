import { number, string } from 'src/rule-impl/type-rules/simpleTypeRules'
import { notNull } from 'src/rule-impl/basic-rules/notNull'
import { notEmpty } from 'src/rule-impl/basic-rules/notEmpty'
import { listOf } from 'src/rule-impl/container-rules/listOf'
import { obj } from 'src/rule-impl/object/obj'

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

        const r = rule.test({
            foo: 'abc',
            bar: 'not-string',
            // baz missing
            child: {},
            items: [{}]
        })

        // console.log(JSON.stringify(r, null, 4))
        expect(r).toMatchObject({
            passed: false,
            error: {
                message:
                    'does not match schema Object with keys: foo,bar,baz,child,items',
                detail: [
                    {
                        attr: 'bar'
                    },
                    {
                        attr: 'baz'
                    },
                    {
                        attr: 'child',
                        errors: [
                            {
                                code: obj.code
                            }
                        ]
                    },
                    {
                        attr: 'items',
                        errors: [
                            {
                                code: listOf.code,
                                message:
                                    'Item at index 0 does not pass rule matches-schema'
                            }
                        ]
                    }
                ]
            }
        })
    })
})
