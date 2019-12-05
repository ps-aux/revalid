import { TypeRuleRuleConstructor } from 'types'

const isTypeRule = (
    typeName: string,
    isType: (a: any) => boolean
): TypeRuleRuleConstructor => {
    const code = `revalid/rules/type/is-${typeName}`
    const cons = () => ({
        name: `is-${typeName}`,
        code,
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

    cons.code = code

    return cons
}

export const number: TypeRuleRuleConstructor = isTypeRule(
    'number',
    x => typeof x === 'number'
)

export const integer: TypeRuleRuleConstructor = isTypeRule(
    'integer',
    x => typeof x === 'number'
) // TODO

export const decimal: TypeRuleRuleConstructor = isTypeRule(
    'decimal',
    x => typeof x === 'number'
) // TODO

export const string: TypeRuleRuleConstructor = isTypeRule(
    'string',
    x => typeof x === 'string'
)

export const boolean: TypeRuleRuleConstructor = isTypeRule(
    'boolean',
    x => typeof x === 'boolean'
)

export const isoDate: TypeRuleRuleConstructor = isTypeRule('valid-date', x => {
    const d = new Date(x)
    return !isNaN(d.getTime())
})
