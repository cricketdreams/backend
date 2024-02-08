import { prisma } from '../../prisma/prisma'
import { User } from '../../ts/interfaces'
import { ROLES, Roles } from '../../ts/type'
import { decryptData } from '../../utils/crypt'
import { getUserType } from '../../utils/user-type'

export const getAllUsersHandler = async ({
  code,
  requestedUsersRole,
  limit,
  page
}: {
  code: string
  requestedUsersRole: Roles
  page?: number
  limit: number
}) => {
  console.log(limit, page)
  let allUser
  const userRole = getUserType(code)

  const skip = page ? (page - 1) * limit : 0

  const queryOptions: any = {
    where: { code },
    orderBy: { createdAt: 'desc' }
  }

  switch (requestedUsersRole) {
    case ROLES.Subadmin:
      queryOptions.include = {
        Subadmin: {
          skip,
          take: limit
        }
      }
      break
    case ROLES.Master:
      queryOptions.include = {
        Master: {
          skip,
          take: limit
        }
      }
      break
    case ROLES.Superagent:
      queryOptions.include = {
        Superagent: {
          skip,
          take: limit
        }
      }
      break
    case ROLES.Agent:
      queryOptions.include = {
        Agent: {
          skip,
          take: limit
        }
      }
      break
    case ROLES.Client:
      queryOptions.include = {
        Client: {
          skip,
          take: limit
        }
      }
      break
    default:
      throw new Error(`Unknown role: ${requestedUsersRole}`)
  }

  allUser = await (prisma[userRole as keyof typeof prisma] as any).findMany(
    queryOptions
  )

  if (allUser[0]) {
    allUser[0].password = await decryptData(allUser[0].password)

    allUser[0][requestedUsersRole].forEach(async (data: User) => {
      const decryptedPassword = await decryptData(data.password)
      data.password = decryptedPassword
    })
  }

  return allUser[0]
}
