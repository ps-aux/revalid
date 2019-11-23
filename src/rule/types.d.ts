import { ValidationRule } from 'src/core/types'

export type RuleConstructor<A> = () => ValidationRule<A>

export type ConfRuleConstructor<A, Config> = (conf: Config) => ValidationRule<A>

type SimpleRuleBuilderConfig = {
    name: string
    holds: (val: any) => boolean
}

export type SimpleRuleBuilder = RuleConstructor<SimpleRuleBuilderConfig>

type RegexRuleBuilderConfig = {
    name: string
    regex: RegExp
}

export type RegexRuleBuilder = RuleConstructor<RegexRuleBuilderConfig>
