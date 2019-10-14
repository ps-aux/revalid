declare type RuleDef = (any?) => Rule

declare type Rule = (any) => Boolean

export const notEmpty: RuleDef

export const notNull: RuleDef

export const email: RuleDef

export const minLen: RuleDef
export const maxLen: RuleDef

export const validNumber: RuleDef

export const gt: RuleDef
