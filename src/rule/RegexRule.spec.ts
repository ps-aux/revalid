import { SimpleRule } from 'src/rule/SimpleRule'
import { RegexRule } from 'src/rule/RegexRule'

describe('SimpleRule', () => {
    it('basic case', () => {
        const rule = RegexRule({ name: 'is-a', regex: /a/ })

        const okRes = rule.test('a')

        expect(okRes).toMatchObject({
            passed: true
        })

        const failRes = rule.test('b')

        expect(failRes).toMatchObject({
            passed: false,
            error: {
                code: 'is-a'
            }
        })
    })

    it('null or undefined is valid', () => {
        const rule = RegexRule({ name: 'any', regex: /any/ })

        expect(rule.test(null)).toMatchObject({
            passed: true
        })

        expect(rule.test(undefined)).toMatchObject({
            passed: true
        })
    })
})
