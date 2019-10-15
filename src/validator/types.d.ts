export type ValidationTestResult = {
    passed: boolean,
    error?:{
        code: string,
        detail?: any
    }
}

export type ValidationRule = {
    test: (val: any) => ValidationTestResult
}

export type Data = { [key: string]: any }


export type ValidationSchema = { [key: string]: ValidationRule }

export type ValidationError = {
    code: string,
    detail: any,
    value: any
}

export type ValidationErrors = {
    [key: string]: ValidationError
} | null

export type Validate = (data: Data) => ValidationErrors


export type Validator = (s: ValidationSchema) => Validate
