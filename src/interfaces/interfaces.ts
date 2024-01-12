import { type Request } from 'express'

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

export interface CustomRequestBody<P, Q, T>
  extends Omit<Request, 'query' | 'params'> {
  user?: any
  files: any
  query: Q
  sessionId: string
  body: T
  params: P
}
