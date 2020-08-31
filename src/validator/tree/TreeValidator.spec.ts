import { treeValidator } from 'src/validator/tree/TreeValidator'
import { ValidationError, ValidationRule } from '../../core/types'

const myRuleError: ValidationError = {
    code: 'my-rule-error',
    error: 'aways error'
}

const myRule: ValidationRule<any, any> = {
    code: myRuleError.code,
    test: () => {
        return myRuleError.error
    }
}

const alwaysTrue: ValidationRule<any, any> = {
    code: 'any',
    test: () => {
        return null
    }
}

// TODO duplicated test with obj()
describe('Validator', () => {
    it('basic test case', () => {
        const sut = treeValidator({
            a: {
                a1: [myRule, myRule],
                a2: {
                    a21: [myRule, myRule],
                    a22: [alwaysTrue]
                }
            },
            b: [myRule]
        })

        const res = sut.validate({})

        expect(res).toMatchObject({
            a: {
                a1: [myRuleError, myRuleError],
                a2: {
                    a21: [myRuleError, myRuleError]
                }
            },
            b: [myRuleError]
        })

        // @ts-ignore
        expect(res.a.a2.a22).toBeUndefined()
    })
})
