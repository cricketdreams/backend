import { prisma } from '../prisma/prisma'
import { Roles } from '../ts/type'
import { compareData, encryptData } from '../utils/crypt'
import { updatePasswordValidator } from '../validators/general.validator'

export const updatePasswordHandler = async (
  code: string,
  currentPassword: string,
  newPassword: string,
  role: Roles
) => {
  updatePasswordValidator.parse({ code, currentPassword, newPassword, role })
  const user = await (prisma[role as keyof typeof prisma] as any).findUnique({
    where: {
      code
    }
  })
  if (!user) {
    throw new Error('User not found')
  }

  const isPasswordValid = await compareData(currentPassword, user.password)

  if (!isPasswordValid) {
    throw new Error('Incorrect password')
  }

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
