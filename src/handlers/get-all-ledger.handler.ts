import { prisma } from '../prisma/prisma'
import { User } from '../ts/interfaces'
import { LEDGER, Roles } from '../ts/type'
import { getAllUsersHandler } from './user/get-all-users.handler'

export const getAllLedgerHandler = async ({
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
  const allCode: string[] = []
  const allUser = await getAllUsersHandler({
    code,
    requestedUsersRole,
    limit,
    page
  })

  allUser[requestedUsersRole].forEach((user: User) => {
    allCode.push(user.code)
  })

  const skip = page ? (page - 1) * limit : 0

  const queryOptions: any = {
    where: {
      code: {
        in: allCode
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    distinct: ['code'],
    select: {
      code: true,
      balance: true
    }
  }

  if (limit) {
    queryOptions.take = limit
  }

  if (skip > 0) {
    queryOptions.skip = skip
  }

  const allLedger = await (
    prisma[
      LEDGER[requestedUsersRole as keyof typeof LEDGER] as keyof typeof prisma
    ] as any
  ).findMany(queryOptions)

  return allLedger
}
