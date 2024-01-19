import { prisma } from '../prisma/prisma'
import { User } from '../ts/interfaces'
import { ROLES, Roles } from '../ts/type'
import { decryptData } from '../utils/crypt'

export const getAllUsersHandler = async (
  user: User,
  requestedUsersRole: Roles
) => {
  let allUser
  if (requestedUsersRole === ROLES.Subadmin) {
    allUser = await (prisma[user.role as keyof typeof prisma] as any).findMany({
      where: { code: user.code },
      include: { Subadmin: true }
    })
  } else if (requestedUsersRole === ROLES.Master) {
    allUser = await (prisma[user.role as keyof typeof prisma] as any).findMany({
      where: { code: user.code },
      include: { Master: true }
    })
  } else if (requestedUsersRole === ROLES.Superagent) {
    allUser = await (prisma[user.role as keyof typeof prisma] as any).findMany({
      where: { code: user.code },
      include: { Superagent: true }
    })
  } else if (requestedUsersRole === ROLES.Agent) {
    allUser = await (prisma[user.role as keyof typeof prisma] as any).findMany({
      where: { code: user.code },
      include: { Agent: true }
    })
  } else if (requestedUsersRole === ROLES.Client) {
    allUser = await (prisma[user.role as keyof typeof prisma] as any).findMany({
      where: { code: user.code },
      include: { Client: true }
    })
  }

  allUser[0][requestedUsersRole].forEach(async (data: User) => {
    const decryptedPassword = await decryptData(data.password)
    data.password = decryptedPassword
  })

  return allUser[0][requestedUsersRole]
}
