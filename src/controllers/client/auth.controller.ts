import { Request, Response } from 'express'
import { logoutHandler } from '../../handlers/logout.handler'
import { newLoginReportHandler } from '../../handlers/login-report.handler'
import { User } from '../../ts/interfaces'
import { prisma } from '../../prisma/prisma'

export const loginClientController = async (req: Request, res: Response) => {
  if (!req.user) throw new Error('User not found')
  const user: User = req.user as User
  await newLoginReportHandler('ClientLoginReport', user, req.ip!)
  return res.status(200).json({
    data: req.user,
    message: 'Login successfully'
  })
}

export const logoutClientController = (req: Request, res: Response) => {
  return logoutHandler(req, res, '/Client/login')
}
