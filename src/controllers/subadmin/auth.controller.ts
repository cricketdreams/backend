import { Request, Response } from 'express'
import { logoutHandler } from '../../handlers/logout.handler'
import { newLoginReportHandler } from '../../handlers/login-report.handler'
import { User } from '../../ts/interfaces'

export const loginSubadminController = async (req: Request, res: Response) => {
  if (!req.user) throw new Error('User not found')
  const user: User = req.user as User
  await newLoginReportHandler('SubadminLoginReport', user, req.ip!)

  return res.status(200).json({
    data: req.user,
    message: 'Login successfully'
  })
}

export const logoutSubadminController = (req: Request, res: Response) => {
  return logoutHandler(req, res, '/subadmin/login')
}
