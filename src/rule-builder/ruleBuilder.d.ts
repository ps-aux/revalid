import { RuleDef } from 'src/common-rules/rules'

declare type ValueTest = (val: any, opts?: any) => Boolean

export const rule: ({ test: ValueTest, code: string }) => RuleDef
