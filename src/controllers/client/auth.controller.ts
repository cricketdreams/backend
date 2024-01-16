import { Request, Response } from 'express'
import { logoutHandler } from '../../handlers/logout.handler'
import { newLoginReportHandler } from '../../handlers/login-report.handler'
import { User } from '../../ts/interfaces'
import { LOGIN_REPORT_DB } from '../../ts/type'

export const loginClientController = async (req: Request, res: Response) => {
  const user: User = req.user as User
  await newLoginReportHandler(LOGIN_REPORT_DB.ClientLoginReport, user, req.ip!)
  return res.status(200).json({
    data: req.user,
    message: 'Login successfully'
  })
}

export const logoutClientController = (req: Request, res: Response) => {
  return logoutHandler(req, res, '/Client/login')
}
