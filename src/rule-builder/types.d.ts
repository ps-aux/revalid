import { ValidationRule } from 'src/validator/types'


export type RuleBuilder<Config> = (conf: Config) => ValidationRule

type SimpleRuleBuilderConfig = {
    name: string
    holds: (val: any) => boolean
}

export type SimpleRuleBuilder = RuleBuilder<SimpleRuleBuilderConfig>

type RegexRuleBuilderConfig = {
    name: string
    regex: RegExp
}

export type RegexRuleBuilder = RuleBuilder<RegexRuleBuilderConfig>
