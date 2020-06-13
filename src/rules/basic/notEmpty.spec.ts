import { ruleTestCases } from 'src/_test/ruleTestCases'
import { notEmpty } from 'src/rules/basic/notEmpty'

describe('notEmpty rule cases', () => {
    const rule = notEmpty()

    ruleTestCases([
        {
            rule,
            input: 'a',
            passes: true
        },
        {
            rule,
            input: '',
            passes: false
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
        }
    ])
})
