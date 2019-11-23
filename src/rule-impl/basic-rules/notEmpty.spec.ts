import { ruleTestCases } from 'src/test/ruleTestCases'
import { notEmpty } from 'src/rule-impl/basic-rules/notEmpty'

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
