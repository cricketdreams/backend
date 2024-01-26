import { Request, Response } from 'express'

import { newLoginReportHandler } from '../../handlers/login-report.handler'
import { logoutHandler } from '../../handlers/logout.handler'
import { prisma } from '../../prisma/prisma'
import { User } from '../../ts/interfaces'
import { LOGIN_REPORT_DB, ROLES } from '../../ts/type'
import { encryptData } from '../../utils/crypt'
import generateCode from '../../utils/generate-code'
import { createAdminSchema } from '../../validators/general.validator'

export const createAdminController = async (req: Request, res: Response) => {
  const { name, password, mobile } = createAdminSchema.parse(req.body)
  const code = await generateCode(ROLES.Admin)
  const encryptedPassword = await encryptData(password)
  const result = await prisma.admin.create({
    data: {
      name,
      code,
      password: encryptedPassword,
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
