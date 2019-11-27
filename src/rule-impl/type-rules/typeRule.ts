import { RuleConstructor } from 'types'

const isTypeRule = (
    typeName: string,
    isType: (a: any) => boolean
): RuleConstructor<any, any> => () => ({
    name: `is-${typeName}`,
    test: (a?: any) => {
        if (a == null)
            return {
                passed: true
            }
        return {
            passed: isType(a)
        }
    }
})

export const number = isTypeRule('number', x => typeof x === 'number')

export const integer = isTypeRule('integer', x => typeof x === 'number') // TODO

export const decimal = isTypeRule('decimal', x => typeof x === 'number') // TODO

export const string = isTypeRule('string', x => typeof x === 'string')

export const boolean = isTypeRule('boolean', x => typeof x === 'boolean')

export const isoDate = () =>
    isTypeRule('valid-date', x => {
        const d = new Date(x)
        return !isNaN(d.getTime())
    })

