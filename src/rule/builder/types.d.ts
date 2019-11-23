import { ValidationRule } from 'src/core/types'


export type RuleBuilder<Config> = (conf: Config) => ValidationRule<any>

type SimpleRuleBuilderConfig = {
    name: string
    holds: (val: any) => boolean
}

export type SimpleRuleBuilder = RuleBuilder<SimpleRuleBuilderConfig>

