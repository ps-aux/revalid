import { ValidationRule, ValidationTestResult } from 'src'
import { compose } from './compose'

it('compose', () => {
    const invocations: string[] = []

    const ruleA: ValidationRule<any, any> = {
        name: 'a',
        test: (a?: any) => {
            invocations.push('a')
            // @ts-ignore
            return {} as ValidationTestResult
        }
    }

    const ruleB: ValidationRule<any, any> = {
        name: 'b',
        test: (a?: any) => {
            invocations.push('b')
            // @ts-ignore
            return {} as ValidationTestResult
        }
    }

    const composed = compose([ruleA, ruleB])

    composed.test('abc')

    expect(composed.name).toBe('a & b')
    expect(invocations).toEqual(['a', 'b'])
})
