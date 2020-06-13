import { ConfRuleConstructor, RuleConstructor } from '../types'
import { AnyErrDetail, NoErrDetail, WithCode } from '../../core-types'

export type NotNullRuleConst = RuleConstructor<any, AnyErrDetail> & WithCode

export type NotEmptyRuleConst = RuleConstructor<string, AnyErrDetail> & WithCode

export type RegexRuleConst = ConfRuleConstructor<string, NoErrDetail, RegExp> &
    WithCode

export type ConstantRuleType = ConfRuleConstructor<any, NoErrDetail, boolean> &
    WithCode

export type EqRuleConst = ConfRuleConstructor<any, NoErrDetail, any> & WithCode

// Types
export type TypeRuleRuleConstructor = RuleConstructor<any, AnyErrDetail> &
    WithCode
