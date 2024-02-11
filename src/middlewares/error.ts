import { NextFunction, Request, Response } from 'express'
import { logger } from '../utils/logger'

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(
    `${err.message}, error code: ${err.code || ''}, error stack: ${err.stack || ''} `
  )
  console.log(err)
  res.status(500).send({
    message: err.message,
    code: err.code
  })
}

export default errorHandler
