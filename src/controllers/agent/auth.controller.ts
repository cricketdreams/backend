import { Request, Response } from 'express'
import { logoutHandler } from '../../handlers/logout.handler'
import { newLoginReportHandler } from '../../handlers/login-report.handler'
import { User } from '../../ts/interfaces'

export const loginAgentController = async (req: Request, res: Response) => {
  if (!req.user) throw new Error('User not found')
  const user: User = req.user as User
  await newLoginReportHandler('AgentLoginReport', user, req.ip!)

  return res.status(200).json({
    data: req.user,
    message: 'Login successfully'
  })
}

export const logoutAgentController = (req: Request, res: Response) => {
  return logoutHandler(req, res, '/Agent/login')
}
