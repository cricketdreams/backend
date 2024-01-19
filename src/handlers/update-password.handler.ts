import { prisma } from '../../src/prisma/prisma'
import { Roles } from '../ts/type'
import { encryptData } from '../utils/crypt'

export const updatePasswordHandler = async (
  code: string,
  newPassword: string,
  role: Roles
) => {
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
