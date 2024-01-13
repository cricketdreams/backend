import { Response, NextFunction } from 'express'
import { CustomRequest } from '../ts/interfaces'

export const postVerify = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    next()
  } else {
    return res.status(401).json({ body: { message: 'Access Denied' } })
  }
}
