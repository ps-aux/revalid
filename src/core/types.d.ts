export type ValidationTestResult<ErrDetail> = {
    passed: boolean
    error?: {
        message: string
        detail: ErrDetail
    }
}

export type ValidationError<ErrDetail> = {
    code: string
    message: string
    detail: ErrDetail
}

export type RuleEvaluator = {
    <A, ErrDetail>(
        rule: ValidationRule<A, ErrDetail>,
        data: A
    ): ValidationError<ErrDetail> | null
}

export type WithCode = {
    code: string
}

export type ValidationRule<A, ErrDetail> = {
    name: string
    code: string
    test: (val?: A) => ValidationTestResult<ErrDetail>
}

export type AnyErrDetail = any

export type NoErrDetail = void

export type ComposeRulesFun = (
    rules: ValidationRule<any, AnyErrDetail>[],
    name?: string
) => ValidationRule<any, AnyErrDetail>
