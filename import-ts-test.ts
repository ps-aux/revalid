import {
    ConstantRuleType,
    EqRuleConst,
    NotEmptyRuleConst,
    NotNullRuleConst,
    RegexRuleConst,
    TypeRuleRuleConstructor,
    AnyErrDetail,
    ValidationError,
    ValidationRule,
    ListOfRuleConst,
    OneOfRuleConst,
    ObjectData,
    AttrValidationError,
    ObjectValidationErrors,
    ObjectValidator,
    CreateObjectValidator,
    ComposeRulesFun
} from 'src'

type Test = {
    core: {
        an: AnyErrDetail
        ve: ValidationError<any>
        vr: ValidationRule<any, any>
        compose: ComposeRulesFun
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
            attrValError: AttrValidationError
            objValErrors: ObjectValidationErrors
            validator: ObjectValidator
            create: CreateObjectValidator
        }
    }
}
