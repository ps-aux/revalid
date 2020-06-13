import { RuleConstructor, NoConfigRuleConstructor } from '../core/types'

export type NotNullRuleConst = NoConfigRuleConstructor<any, string>

export type NotEmptyRuleConst = NoConfigRuleConstructor<string | any[], string>

export type RegexRuleConst = RuleConstructor<string, string, RegExp>

export type ConstantRuleType = RuleConstructor<any, string, boolean>

export type EqRuleConst = RuleConstructor<any, string, any>
