import { prisma } from '../../prisma/prisma'
import { ROLES, Roles } from '../../ts/type'
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

  return allUser[0]
}
