import codes from 'src/core-rules/codes'
import { regexRule, rule } from 'src/rule-builder/SimpleRule'

export const notEmpty = () => v =>
    v && v.trim().length > 0 ? undefined : codes.EMPTY

export const notNull = () => v =>
    v == null || v === undefined ? codes.EMPTY : undefined

export const validNumber = rule({
    test: v => typeof v === 'number' && !Number.isNaN(v),
    code: codes.INVALID_NUMBER
})

export const minLen = rule({
    test: (v, ops) => v.length >= ops,
    code: codes.MIN_LEN
})

export const maxLen = rule({
    test: (v, ops) => v.length <= ops,
    code: codes.MAX_LEN
})

export const email = regexRule({
    regex: /^[a-zA-Z0-9+._%\-+]{1,256}@[a-zA-Z0-9][a-zA-Z0-9-]{0,64}(\.[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25})$/,
    code: codes.EMAIL
})

export const phoneNumber = regexRule({
    regex: /^00421(2|9\d{2})\d{6}$/,
    code: codes.PHONE_NUMBER
})

// TODO add test
export const gt = rule({
    test: (v, opts) => v > opts,
    code: codes.TOO_SMALL
})

const sk = [
    '\u013A',
    '\u013E',
    '\u0148',
    '\u0155',
    '\u0165',
    '\u00FA',
    '\u00F4',
    '\u00C4',
    '\u010E',
    '\u0139',
    '\u013D',
    '\u0147',
    '\u0154',
    '\u0164',
    '\u00DA',
    '\u00D4',
    '\u00CD',
    '\u00D3',
    '\u00DD',
    '\u00E1',
    '\u00E9',
    '\u00ED',
    '\u00F3',
    '\u00FD',
    '\u010C',
    '\u010D',
    '\u010F',
    '\u0160',
    '\u0161',
    '\u017D',
    '\u017E',
    '\u00E4',
    '\u00C9',
    '\u00C1'
]
const cz = [
    '\u0148',
    '\u0165',
    '\u00FA',
    '\u010E',
    '\u0147',
    '\u0164',
    '\u00DA',
    '\u00CD',
    '\u00D3',
    '\u00DD',
    '\u00E1',
    '\u00E9',
    '\u00ED',
    '\u00F3',
    '\u00FD',
    '\u010C',
    '\u010D',
    '\u010F',
    '\u0160',
    '\u0161',
    '\u017D',
    '\u017E',
    '\u00C9',
    '\u00C1',
    '\u011A',
    '\u011B',
    '\u0159',
    '\u0158',
    '\u016E',
    '\u016F'
]

/**
 * Remove duplicates
 */
// @ts-ignore
const all = [...sk, ...cz].reduce((acc, curr) => {
    if (!acc.find(i => i === curr)) return [...acc, curr]
    return acc
}, [])

const onlyLettersRegex = new RegExp(`^[A-Za-z,${all.join(',')}]*$`)

// en, sk, cz alphabet
export const onlyLetters = regexRule({
    regex: onlyLettersRegex,
    code: codes.ONLY_LETTERS
})
