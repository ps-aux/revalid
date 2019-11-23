import { ValidationRule } from 'src/core/types'

export type Data = { [key: string]: any }

export type Schema = { [key: string]: ValidationRule<any>[] }
