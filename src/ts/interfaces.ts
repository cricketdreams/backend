import { type Request } from 'express'
import { Roles } from './type'

export interface User {
  code: string
  name: string
  password: string
  mobile: string
  limit: number
  role: Roles
}
export interface decodedToken {
  _id: string
  ext: number
  iat: number
}
export interface CustomRequest extends Request {
  user?: any
  files: any
  query: any
  sessionId: any
}

export type CreateUserBody = {
  upLinkCode: string
  name: string
  password: string
  mobile: string
  reference: string
  share: number
  sessionCommission: number
  matchCommission: number
  mobileShare?: number,
  mobileCharge?: number
}

export interface CustomRequestBody<P, Q, T>
  extends Omit<Request, 'query' | 'params'> {
  user?: any
  files: any
  query: Q
  sessionId: string
  body: T
  params: P
}
