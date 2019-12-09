import { listValidator } from 'src/validator/ListValidator'
import { integer } from 'src/rule-impl/type-rules/simpleTypeRules'

describe('List validator', () => {
    it('basic test case', () => {
        const sut = listValidator({
            itemSchema: {
                a: integer()
            }
        })

        const errs = sut([{ a: 'haha' }, { a: 123 }])

        // console.log('errs', JSON.stringify(errs, null, 4))

        expect(errs).toMatchObject({
            0: {
                errors: {
                    a: {
                        value: 'haha',
                        errors: [
                            {
                                code: 'is-integer',
                                message: "Does not pass rule 'is-integer'"
                            }
                        ]
                    }
                },
                value: {
                    a: 'haha'
                }
            }
        })
    })
})
