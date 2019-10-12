import { validator } from 'src/validator'
import { email, minLen, notEmpty } from './rules'
import codes from 'src/common-rules/codes'

describe('validator', () => {
    it('applies rules', () => {
        const validate = validator({
            a: [() => 'bad a'],
            b: [() => 'bad b']
        })

        expect(validate({})).toMatchObject({
            a: { code: 'bad a' },
            b: { code: 'bad b' }
        })
    })

    it('integration with predefined rules', () => {
        const validate = validator({
            a: [notEmpty()],
            b: [email()],
            c: [notEmpty(), minLen(3)]
        })

        expect(
            validate({
                a: '',
                b: 'abc',
                c: ''
            })
        ).toMatchObject({
            a: { code: codes.EMPTY },
            b: { code: codes.EMAIL },
            c: { code: codes.EMPTY }
        })

        expect(
            validate({
                a: 'ok',
                b: 'email@email.com',
                c: '12'
            })
        ).toMatchObject({
            c: { code: codes.MIN_LEN }
        })
    })

    it('with error wrapping', () => {
        const validate = validator(
            {
                a: [notEmpty()]
            },
            { codesOnly: false }
        )

        expect(
            validate({
                a: ''
            })
        ).toMatchObject({
            a: { code: codes.EMPTY }
        })
    })
})
