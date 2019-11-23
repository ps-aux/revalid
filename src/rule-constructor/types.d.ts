import { ValidationRule } from 'src/core/types'

export type RuleConstructor<A, ErrDetail> = () => ValidationRule<A, ErrDetail>

export type ConfRuleConstructor<A, ErrDetail, Config> = (conf: Config) => ValidationRule<A, ErrDetail>



