import {
    ConstantRuleType,
    EqRuleConst,
    NotEmptyRuleConst,
    NotNullRuleConst,
    RegexRuleConst,
    TypeRuleRuleConstructor,
    ValidationError,
    ValidationRule,
    ListOfRuleConst,
    OneOfRuleConst,
    ObjectData,
    ObjectValidationErrorResult,
    ObjectValidator,
    CreateObjectValidator,
    AttrError,
    EvalRule
} from 'src'

type Test = {
    core: {
        ve: ValidationError<any>
        vr: ValidationRule<any, any>
        evalRule: EvalRule
    }
    rules: {
        basic: {
            eq: EqRuleConst
            notNull: NotNullRuleConst
            notEmpty: NotEmptyRuleConst
            regex: RegexRuleConst
            constant: ConstantRuleType
        }
        type: {
            trrc: TypeRuleRuleConstructor
        }
        container: {
            list: ListOfRuleConst
            oneOf: OneOfRuleConst
        }
        object: {
            data: ObjectData
            objValErrors: ObjectValidationErrorResult
            validator: ObjectValidator
            create: CreateObjectValidator
            attrError: AttrError
        }
    }
}
