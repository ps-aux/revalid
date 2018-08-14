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
    Object.entries(errors)
        // eslint-disable-next-line
        .reduce((a, [name, err]) => (a[name] = map(err), a), {})

export const validator = (schema, {codesOnly} = {}) =>
    data => {
        const errors = validate(schema, data)
        if (codesOnly)
            return errors

        return wrap(errors, code => ({code}))
    }
