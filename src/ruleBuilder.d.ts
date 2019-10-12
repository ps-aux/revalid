import { RuleDef } from 'src/rules'

declare type ValueTest = (val: any, opts?: any) => Boolean

export const rule: ({ test: ValueTest, code: string }) => RuleDef
