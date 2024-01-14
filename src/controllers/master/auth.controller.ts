import { Request, Response } from 'express'
import { logoutHandler } from '../../handlers/auth'
import { newLoginReportHandler } from '../../handlers/login-report'
import { User } from '../../ts/interfaces'

export const loginMasterController = async (req: Request, res: Response) => {
  if (!req.user) throw new Error('User not found')
  const user: User = req.user as User
  await newLoginReportHandler('MasterLoginReport', user, req.ip!)

  return res.status(200).json({
    data: req.user,
    message: 'Login successfully'
  })
}

export const logoutMasterController = (req: Request, res: Response) => {
  return logoutHandler(req, res, '/Master/login')
}
