import { prisma } from '../prisma/prisma'
import { Roles } from '../ts/type'
import { encryptData } from '../utils/crypt'
import { updatePasswordValidator } from '../validators/general.validator'

export const updatePasswordHandler = async (
  code: string,
  newPassword: string,
  role: Roles
) => {
  updatePasswordValidator.parse({ code, newPassword, role })
  const encryptPassword = await encryptData(newPassword)
  const result = await (prisma[role as keyof typeof prisma] as any).update({
    where: {
      code
    },
    data: {
      password: encryptPassword
    }
  })
  return result
}
