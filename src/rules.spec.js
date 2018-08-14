import codes from './codes'
import { minLen, notEmpty } from './rules'
import {
    email,
    maxLen,
    notNull,
    phoneNumber,
    onlyLetters
} from './rules'

const testRule = (name, rule, {error, valid = [], invalid = []}) =>
    describe(name, () => {
        valid.forEach(v =>
            it(`${v} is valid`, () => {
                expect(rule(v)).toBeFalsy()
            })
        )

        invalid.forEach(v =>
            it(`${v} is invalid`, () => {
                expect(rule(v)).toBe(error)
            })
        )
    })

describe('rules', () => {
    testRule('notEmpty', notEmpty(), {
        error: codes.EMPTY,
        valid: ['yes'],
        invalid: ['', ' ', undefined, null]
    })

    testRule('notNull', notNull(), {
        error: codes.EMPTY,
        valid: [{}, ''],
        invalid: [undefined, null]
    })

    testRule('minLen', minLen(3), {
        error: codes.MIN_LEN,
        valid: ['123', '1234'],
        invalid: ['ab']
    })

    testRule('maxLen', maxLen(3), {
        error: codes.MAX_LEN,
        valid: ['12', '123'],
        invalid: ['abcd']
    })

    testRule('email', email(), {
        error: codes.EMAIL,
        valid: ['jano@email.com', 'abc@abc.com'],
        invalid: ['ab']
    })

    testRule('phoneNumber', phoneNumber(), {
        error: codes.PHONE_NUMBER,
        valid: ['00421900123456', '004212123456'],
        invalid: ['+421900123456', '0042190012345']
    })

    testRule('only letters', onlyLetters(), {
        error: codes.ONLY_LETTERS,
        valid: ['abcdefghijklmnopqrstuvxyz', 'ÁáÄäČčĎďÉéÍíĹĺĽľŇňÓóÔôŔŕŠšŤťÚúÝýŽžÁáČčĎďÉéĚěÍíŇňÓóŘřŠšŤťÚúŮůÝýŽž'],
        invalid: ['Doe_', 'In va#lid', 'NoWay123']
    })
})
