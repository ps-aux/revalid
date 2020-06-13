import { evalRule } from './EvalRule'
import { ValidationRule } from 'types'

const mustBeFoo: ValidationRule<string, string> = {
    code: 'must-be-foo',
    test: x => {
        if (x === 'foo') return null
        return 'is not foo'
    }
}

const sut = evalRule

describe('RuleEvaluator', () => {
    it('passes rule', () => {
        const res = sut(mustBeFoo, 'foo')
        expect(res).toBeNull()
    })

    it('does not pass rule', () => {
        const res = sut(mustBeFoo, 'bar')
        expect(res).toMatchObject({
            code: 'must-be-foo',
            error: 'is not foo'
        })
    })
})
