import { ruleTestCases } from 'src/_test/ruleTestCases'
import { eq } from 'src/rules/basic/eq'

describe('eq rule cases', () => {
    ruleTestCases([
        {
            rule: eq('a'),
            input: 'a',
            passes: true
        },
        {
            rule: eq('aaa'),
            input: null,
            passes: true
        },
        {
            rule: eq(111),
            input: undefined,
            passes: true
        },
        {
            rule: eq(12),
            input: 'wowow',
            passes: false
        }
    ])
})
