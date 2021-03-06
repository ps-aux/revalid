import { ruleTestCases } from 'src/_test/ruleTestCases'
import { notNull } from 'src/rules/basic/notNull'

describe('notNull rule cases', () => {
    const rule = notNull()

    ruleTestCases([
        {
            rule,
            input: 'a',
            passes: true
        },
        {
            rule,
            input: {},
            passes: true
        },
        {
            rule,
            input: null,
            passes: false
        },
        {
            rule,
            input: undefined,
            passes: false
        },
        {
            rule,
            input: '',
            passes: true
        }
    ])
})
