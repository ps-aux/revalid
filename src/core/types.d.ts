export type ValidationError<Err = any> = {
    code: string
    error: Err
}
export type ValidationResult<Err = any> = ValidationError<Err>[]

export type Validator<Input, Err> = (
    data: Input | undefined | null
) => ValidationResult<Err>

// --------------------

export type ValidationRule<Input, Err> = {
    code: string
    test: (input: Input | undefined | null, eval: EvalRule) => Err | null
}

export type EvalRule = {
    <A, ErrDetail>(
        rule: ValidationRule<A, ErrDetail>,
        data: A
    ): ValidationError<ErrDetail> | null
}
