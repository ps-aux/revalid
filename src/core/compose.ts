import { ComposeRulesFun } from 'src'

export const compose: ComposeRulesFun = (rules, name) => {
    if (!name) {
        name = rules.map(r => r.name).join(' & ')
    }

    return {
        name,
        code: name,
        test: (v?: any) => {
            for (const r of rules) {
                const res = r.test(v)

                if (!res.passed) return res
            }

            return {
                passed: true
            }
        }
    }
}
