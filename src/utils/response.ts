import { NextFunction, Request, Response } from 'express'
import { logFatal } from './logger'
import { HttpStatusCode, HTTP_STATUS_CODE } from '../ts/type'

export class BaseError extends Error {
  public readonly name: string
  public readonly httpCode: HttpStatusCode
  public readonly isOperational: boolean

  constructor(
    name: string,
    httpCode: HttpStatusCode,
    description: string,
    isOperational: boolean
  ) {
    super(description)
    Object.setPrototypeOf(this, new.target.prototype)

    this.name = name
    this.httpCode = httpCode
    this.isOperational = isOperational

    Error.captureStackTrace(this)
  }
}

export class APIError extends BaseError {
  constructor(
    name: string,
    httpCode = HTTP_STATUS_CODE.INTERNAL_SERVER,
    isOperational = true,
    description = 'internal server error'
  ) {
    super(name, httpCode, isOperational, description)
  }
}

class ErrorHandler {
  public async handleError(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    logFatal.log(
      'fatal',
      `${err.message}, error code: ${err instanceof BaseError ? err.httpCode : ''}, error stack: ${err.stack || ''}`
    )
    res
      .status(
        err instanceof BaseError
          ? Number(err.httpCode)
          : HTTP_STATUS_CODE.INTERNAL_SERVER
      )
      .json({
        error: {
          name: err.name || 'UnknownError',
          message: err.message || 'An unexpected error occurred.',
          code:
            err instanceof BaseError
              ? Number(err.httpCode)
              : HTTP_STATUS_CODE.INTERNAL_SERVER
        }
      })
  }

  public isTrustedError(error: Error): boolean {
    return error instanceof BaseError && error.isOperational
  }
}

export const errorHandler = new ErrorHandler()
