import { ruleTestCases } from 'src/_test/ruleTestCases'
import { oneOf } from 'src/rules/container/oneOf'

describe('oneOf rule cases', () => {
    const strRule = oneOf(['a', 'b', 'c'])

    ruleTestCases([
        {
            rule: strRule,
            input: 'a',
            passes: true
        },
        {
            rule: strRule,
            input: '',
            passes: false
        },
        {
            rule: strRule,
            input: 'd',
            passes: false
        },
        {
            rule: strRule,
            input: null,
            passes: true
        },
        {
            rule: strRule,
            input: undefined,
            passes: true
        }
    ])

    const numberRule = oneOf([1, 2, 3])

    ruleTestCases([
        {
            rule: numberRule,
            input: 1,
            passes: true
        },
        {
            rule: numberRule,
            input: 4,
            passes: false
        }
    ])
})
