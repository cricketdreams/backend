import { Request, Response } from 'express'
import { logoutHandler } from '../../handlers/auth'
import { newLoginReportHandler } from '../../handlers/login-report'
import { User } from '../../interfaces/interfaces'

export const loginSuperagentController = async (req: Request, res: Response) => {
  try {
    if (!req.user) throw new Error('User not found')
    const user: User = req.user as User
    await newLoginReportHandler('SuperagentLoginReport', user, req.ip!)

    res.status(200).json({
      data: req.user,
      message: 'Login successfully'
    })
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({
        message: error.message
      })
  }
}

export const logoutSuperagentController = (req: Request, res: Response) => {
  try {
    logoutHandler(req, res, '/Superagent/login')
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({
        message: error.message
      })
  }
}
