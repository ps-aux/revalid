export type ValidationTestResult = {
    passed: boolean
    error?: {
        message: string
        detail?: any
    }
}

export type ValidationRule<A> = {
    name: string
    test: (val?: A) => ValidationTestResult
}

export type ValidationError = {
    code: string
    message: string
    detail?: any
}

export type RuleEvaluator = {
    <A>(rule: ValidationRule<A>, data: A): ValidationError | null
}
