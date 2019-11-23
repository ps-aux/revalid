import { ValidationRule } from 'src/core/types'
import { evalRule } from 'src/core/RuleEvaluator'

const mustBeFoo: ValidationRule<string> = {
    name: 'must-be-foo',
    test: x => {
        const passed = x === 'foo'

        return {
            passed,
            error: passed
                ? undefined
                : {
                      message: 'it is not foo',
                      detail: 'detail'
                  }
        }
    }
}

describe('RuleEvaluator', () => {
    it('passes rule', () => {
        const res = evalRule(mustBeFoo, 'foo')
        expect(res).toBeNull()
    })

    it('does not pass rule', () => {
        const res = evalRule(mustBeFoo, 'bar')
        expect(res).toMatchObject({
            code: 'must-be-foo',
            message: 'it is not foo',
            detail: 'detail'
        })
    })
})
