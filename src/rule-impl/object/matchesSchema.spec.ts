import { matchesSchema } from 'src/rule-impl/object/matchesSchema'
import { number, string } from 'src/rule-impl/type-rules/typeRule'
import { notNull } from 'src/rule-impl/basic-rules/notNull'
import { notEmpty } from 'src/rule-impl/basic-rules/notEmpty'

describe('matchesSchema', () => {
    it('basic case', () => {
        const rule = matchesSchema({
            foo: [notNull(), string()],
            bar: [notNull(), number()],
            baz: [notNull(), string()],
            child: [
                matchesSchema({
                    name: [notEmpty()]
                })
            ]
        })

        const r = rule.test({
            foo: 'abc',
            bar: 'not-string',
            // baz missing
            child: {}
        })

        // console.log(JSON.stringify(r, null, 4))
        expect(r).toMatchObject({
            passed: false,
            error: {
                message:
                    'does not match schema Object with keys: foo,bar,baz,child',
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
                                code: 'matches-schema'
                            }
                        ]
                    }
                ]
            }
        })
    })
})
