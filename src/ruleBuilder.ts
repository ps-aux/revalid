export const rule = ({ test, code }) => (ops?: any) => val => {
    if (val == null) return false

    return test(val, ops) ? false : code
}

export const regexRule = ({ regex, code }) =>
    rule({
        test: v => regex.test(v),
        code
    })
