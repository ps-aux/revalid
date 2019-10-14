import { regexRule, rule } from 'src/rule-builder/ruleBuilder'

describe('ruleBuilder', () => {
    describe('rule', () => {
        it('truthy test return falsy', () => {
            const always = rule({
                test: () => true,
                code: 'any'
            })()

            expect(always('any')).toBeFalsy()
        })

        it('falsy test return code', () => {
            const never = rule({
                test: () => false,
                code: 'code'
            })()

            expect(never('any')).toBe('code')
        })
    })

    it('regexRule', () => {
        const r = regexRule({
            regex: /abc/,
            code: 'code'
        })()

        expect(r('abc')).toBeFalsy()
        expect(r('xx')).toBe('code')
    })
})
