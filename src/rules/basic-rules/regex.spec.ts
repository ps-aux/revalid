import { ruleTestCases } from 'src/test/ruleTestCases'
import { regex } from 'src/rules/basic-rules/regex'

describe('regex rule cases', () => {
    const rule = regex(/a/)

    ruleTestCases([
        {
            rule,
            input: 'a',
            passes: true
        },
        {
            rule,
            input: 'b',
            passes: false
        },
        {
            rule,
            input: null,
            passes: true
        },
        {
            rule,
            input: undefined,
            passes: true
        },
        {
            rule,
            input: '',
            passes: false
        }
    ])
})
