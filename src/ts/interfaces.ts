import { type Request } from 'express'

export interface User {
  code: string
  name: string
  password: string
  mobile: string
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
  mobileCommission: number
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
