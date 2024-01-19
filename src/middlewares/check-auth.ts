import { Request, Response, NextFunction } from 'express'
interface AuthenticatedRequest extends Request {
  isAuthenticated(): boolean
}
export const isAuthenticated = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next()
  } else {
    return res.status(401).json({ message: 'Unauthorized access' })
  }
}
