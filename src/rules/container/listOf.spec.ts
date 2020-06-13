import { ruleTestCases } from 'src/_test/ruleTestCases'
import { listOf } from 'src/rules/container/listOf'
import { eq } from 'src/rules/basic/eq'

describe('listOf rule cases', () => {
    ruleTestCases([
        {
            rule: listOf(eq(4)),
            input: [4, 4, 4],
            passes: true
        },
        {
            rule: listOf(eq(5)),
            input: [4, 4, 4],
            passes: false
        },
        {
            rule: listOf(eq(5)),
            input: undefined,
            passes: true
        },
        {
            rule: listOf(eq(5)),
            input: null,
            passes: true
        }
    ])
})
