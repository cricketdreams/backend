import { NextFunction, Request, Response } from 'express'
import { logCatchError } from './logger'

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logCatchError.error(err)
  res.status(500).send('Something went wrong')
}

export default errorHandler
