import { SimpleRule } from 'src/rule/SimpleRule'

describe('SimpleRule', () => {
    it('basic case', () => {
        const rule = SimpleRule({ name: 'is-4', holds: v => v === 4 })

        const okRes = rule.test(4)

        expect(okRes).toMatchObject({
            passed: true
        })

        const failRes = rule.test(6)

        expect(failRes).toMatchObject({
            passed: false,
            error: {
                code: 'is-4'
            }
        })
    })

    it('null or undefined is valid', () => {
        const rule = SimpleRule({ name: 'any', holds: () => false })

        expect(rule.test(null)).toMatchObject({
            passed: true
        })

        expect(rule.test(undefined)).toMatchObject({
            passed: true
        })
    })
})
