import { ValidationRule } from 'src'
import { compose } from './compose'

it('all rules are invoked', () => {
    const invocations: string[] = []

    const ruleA: ValidationRule<any, any> = {
        name: 'a',
        code: 'any',
        test: () => {
            invocations.push('a')
            return {
                passed: true
            }
        }
    }

    const ruleB: ValidationRule<any, any> = {
        name: 'b',
        code: 'any',
        test: () => {
            invocations.push('b')
            return {
                passed: true
            }
        }
    }

    const composed = compose([ruleA, ruleB])

    composed.test('abc')

    expect(composed.name).toBe('a & b')
    expect(invocations).toEqual(['a', 'b'])
})

it('returns first fail', () => {
    const ruleA: ValidationRule<any, any> = {
        name: 'a',
        code: 'any',
        test: () => {
            return {
                passed: false
            }
        }
    }

    const mock = jest.fn()

    const ruleB: ValidationRule<any, any> = {
        code: 'any',
        name: 'b',
        test: mock
    }

    const composed = compose([ruleA, ruleB])

    const r = composed.test('abc')

    expect(r.passed).toEqual(false)
    expect(mock.mock.calls.length).toBe(0)
})
