import { NextFunction, Request, Response } from 'express'
import { logger } from '../utils/logger'

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`${err.message}, error code: ${err.code || ''} `)
  res.status(500).send('Something went wrong')
}

export default errorHandler
