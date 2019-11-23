export type ValidationTestResult<ErrDetail> = {
    passed: boolean
    error?: {
        message: string
        detail: ErrDetail
    }
}

export type ValidationRule<A, ErrDetail> = {
    name: string
    test: (val?: A) => ValidationTestResult<ErrDetail>
}

export type ValidationError<ErrDetail> = {
    code: string
    message: string
    detail: ErrDetail
}

export type RuleEvaluator = {
    <A, ErrDetail>(rule: ValidationRule<A, ErrDetail>, data: A): ValidationError<ErrDetail> | null
}
