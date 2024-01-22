import { Request, Response } from 'express'

import { User } from '../ts/interfaces'
import { Roles } from '../ts/type'
import { updatePasswordHandler } from '../handlers/update-password.handler'

export const updatePasswordController = async (req: Request, res: Response) => {
  const { newPassword } = req.body
  const user = req.user as User
  const role = user.role as Roles
  const code = user.code as string
  await updatePasswordHandler(code, newPassword, role)
  return res.status(200).end
}
