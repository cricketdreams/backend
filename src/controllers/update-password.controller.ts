import { Request, Response } from 'express'

import { updatePasswordHandler } from '../handlers/update-password.handler'
import { User } from '../ts/interfaces'
import { Roles } from '../ts/type'

export const updatePasswordController = async (req: Request, res: Response) => {
  const { currentPassword ,newPassword } = req.body
  const user = req.user as User
  const role = user.role as Roles
  const code = user.code as string
  await updatePasswordHandler(code, currentPassword, newPassword, role)
  return res.json({ success: true, message: 'Password updated Successfully' })
}
