import { prisma } from '../../prisma/prisma'
import { User } from '../../ts/interfaces'
import { ROLES, Roles } from '../../ts/type'
import { decryptData } from '../../utils/crypt'
import { getUserType } from '../../utils/user-type'

export const getAllUsersHandler = async (
  code: string,
  requestedUsersRole: Roles
) => {
  let allUser
  const userRole = getUserType(code)
  if (requestedUsersRole === ROLES.Subadmin) {
    allUser = await (prisma[userRole as keyof typeof prisma] as any).findMany({
      where: { code },
      include: { Subadmin: true }
    })
  } else if (requestedUsersRole === ROLES.Master) {
    allUser = await (prisma[userRole as keyof typeof prisma] as any).findMany({
      where: { code },
      include: { Master: true }
    })
  } else if (requestedUsersRole === ROLES.Superagent) {
    allUser = await (prisma[userRole as keyof typeof prisma] as any).findMany({
      where: { code },
      include: { Superagent: true }
    })
  } else if (requestedUsersRole === ROLES.Agent) {
    allUser = await (prisma[userRole as keyof typeof prisma] as any).findMany({
      where: { code },
      include: { Agent: true }
    })
  } else if (requestedUsersRole === ROLES.Client) {
    allUser = await (prisma[userRole as keyof typeof prisma] as any).findMany({
      where: { code },
      include: { Client: true }
    })
  }
  allUser[0].password = await decryptData(allUser[0].password)
  allUser[0][requestedUsersRole].forEach(async (data: User) => {
    const decryptedPassword = await decryptData(data.password)
    data.password = decryptedPassword
  })
  return allUser[0]
}
