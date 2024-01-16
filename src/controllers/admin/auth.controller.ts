import { Request, Response } from 'express'
import { logoutHandler } from '../../handlers/logout.handler'
import { newLoginReportHandler } from '../../handlers/login-report.handler'
import { User } from '../../ts/interfaces'
import { prisma } from '../../prisma/prisma'
import generateCode from '../../utils/generateCode'
import { hashPassword } from '../../utils/password'

export const createAdminController = async (req: Request, res: Response) => {
  const { name, password, mobile } = req.body
  const code = await generateCode('Admin')
  const hashedPassword = await hashPassword(password)
  const result = await prisma.admin.create({
    data: {
      name,
      code,
      password: hashedPassword,
      mobile
    }
  })
  return res.status(201).json({
    data: result,
    message: 'Admin created successfully'
  })
}

export const loginAdminController = async (req: Request, res: Response) => {
  if (!req.user) throw new Error('User not found')
  const user: User = req.user as User
  await newLoginReportHandler('AdminLoginReport', user, req.ip!)
  return res.status(200).json({
    data: req.user,
    message: 'Login successfully'
  })
}

export const logoutAdminController = (req: Request, res: Response) => {
  return logoutHandler(req, res, '/admin/login')
}
