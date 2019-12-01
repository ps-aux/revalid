import { composeRulesFun } from 'src'

export const compose: composeRulesFun = (rules, name) => {
    if (!name) {
        name = rules.map(r => r.name).join(' & ')
    }

    return {
        name,
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