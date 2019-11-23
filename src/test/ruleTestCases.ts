import { ValidationRule } from 'src/core/types'

export type Spec<A> = {
    rule: ValidationRule<A>
    input: A,
    passes: boolean
}


export const ruleTestCases = (specs: Spec<any>[]) => {
    specs.forEach(s => {
        it(`${s.rule.name}: ${s.input} should be ${s.passes ? '✓' : '✕'}`, () => {
            const r = s.rule.test(s.input)

            expect(r).toMatchObject({
                passed: s.passes
            })

        })
    })
}