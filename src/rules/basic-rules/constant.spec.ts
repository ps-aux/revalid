import { ruleTestCases } from 'src/test/ruleTestCases'
import { constant } from 'src/rules/basic-rules/constant'

describe('constant rule cases', () => {
    const always = constant(true)

    const never = constant(false)

    ruleTestCases([
        {
            rule: always,
            input: 'a',
            passes: true
        },
        {
            rule: always,
            input: null,
            passes: true
        },
        {
            rule: always,
            input: undefined,
            passes: true
        },
        {
            rule: never,
            input: 'wowow',
            passes: false
        }
    ])
})
