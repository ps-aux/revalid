import { booleanLiteral } from '@babel/types'

const test = (rules, val) => {
    for (const r of rules) {
        const err = r(val)
        if (err) return err
    }
}

const validate = (schema, data) => {
    const errors = {}

    Object.entries(schema)
        .map(([key, rules]) => [key, test(rules, data[key])])
        .forEach(([key, err]) => {
            if (err) errors[key] = err
        })

    return errors
}

const wrap = (errors, map) =>
    Object.entries(errors).reduce(
        // eslint-disable-next-line no-sequences
        (a, [name, err]) => ((a[name] = map(err)), a),
        {}
    )

type Opts = {
    codesOnly?: boolean
}

export const validator = (schema: any, opts: Opts = {}) => data => {
    const errors = validate(schema, data)
    if (opts.codesOnly) return errors

    return wrap(errors, code => ({ code }))
}
