import { ValidationRule } from '../../types'

export type Spec<A> = {
    rule: ValidationRule<A, any>
    input: A
    passes: boolean
}

export const ruleTestCases = (specs: Spec<any>[]) => {
    specs.forEach(s => {
        it(`${s.rule.code}: ${s.input} should be ${
            s.passes ? '✓' : '✕'
        }`, () => {
            // @ts-ignore
            const r = s.rule.test(s.input, null)

            if (s.passes) expect(r).toBeNull()
            else expect(r).toBeDefined()
        })
    })
}
