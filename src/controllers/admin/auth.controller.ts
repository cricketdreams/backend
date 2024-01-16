import { Request, Response } from 'express'

import { logoutHandler } from '../../handlers/logout.handler'
import { newLoginReportHandler } from '../../handlers/login-report.handler'
import { User } from '../../ts/interfaces'
import { prisma } from '../../prisma/prisma'
import generateCode from '../../utils/generateCode'
import { hashPassword } from '../../utils/password'
import { LOGIN_REPORT_DB, ROLES } from '../../ts/type'

export const createAdminController = async (req: Request, res: Response) => {
  const { name, password, mobile } = req.body
  const code = await generateCode(ROLES.Admin)
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
  const user: User = req.user as User
  await newLoginReportHandler(LOGIN_REPORT_DB.AdminLoginReport, user, req.ip!)
  return res.status(200).json({
    data: req.user,
    message: 'Login successfully'
  })
}

export const logoutAdminController = (req: Request, res: Response) => {
  return logoutHandler(req, res, '/admin/login')
}
