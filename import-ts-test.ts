import {
    ConstantRuleType,
    EqRuleConst,
    NotEmptyRuleConst,
    NotNullRuleConst,
    RegexRuleConst,
    TypeRuleRuleConstructor,
    AnyErrDetail,
    ValidationError,
    ValidationRule
} from 'src'

type Test = {
    rules: {
        c: ConstantRuleType
        e: EqRuleConst
        ne: NotEmptyRuleConst
        nn: NotNullRuleConst
        trrc: TypeRuleRuleConstructor
        rg: RegexRuleConst
    }
    core: {
        an: AnyErrDetail
        ve: ValidationError<any>
        vr: ValidationRule<any, any>
    }
}
