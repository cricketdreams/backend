import { Request, Response } from 'express'
import { logoutHandler } from '../../handlers/auth'
import { newLoginReportHandler } from '../../handlers/login-report'
import { User } from '../../ts/interfaces'
import { prisma } from '../../prisma/prisma'
import generateCode from '../../utils/generateCode'
import { hashPassword } from '../../utils/password'

export const createAdminController = async (req: Request, res: Response) => {
  try {
    const { name, password, mobile } = req.body
    const code = generateCode('admin')
    const hashedPassword = await hashPassword(password)
    const result = await prisma.admin.create({
      data: {
        name,
        code,
        password: hashedPassword,
        mobile
      }
    })
    res.status(201).json({
      data: result,
      message: 'Admin created successfully'
    })
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({
        message: error.message
      })
  }
}

export const loginAdminController = async (req: Request, res: Response) => {
  try {
    if (!req.user) throw new Error('User not found')
    const user: User = req.user as User
    await newLoginReportHandler('AdminLoginReport', user, req.ip!)
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

export const logoutAdminController = (req: Request, res: Response) => {
  try {
    logoutHandler(req, res, '/admin/login')
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({
        message: error.message
      })
  }
}
