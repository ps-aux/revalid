import { ValidationRule } from '../../core/types'

export type NoConfigRuleConstructor<Input, Err> = {
    (): ValidationRule<Input, Err>
    code: string
}

export type RuleConstructor<Input, Err, Config> = {
    (conf: Config): ValidationRule<Input, Err>
    code: string
}
