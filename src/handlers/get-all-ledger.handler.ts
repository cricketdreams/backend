import { prisma } from '../prisma/prisma'
import { User } from '../ts/interfaces'
import { LEDGER, Roles } from '../ts/type'
import { getAllUsersHandler } from './user/get-all-users.handler'

export const getAllLedgerHandler = async (
  code: string,
  requestedUsersRole: Roles
) => {
  let allCode: string[] = []
  const allUser = await getAllUsersHandler(code, requestedUsersRole)
  allUser[requestedUsersRole].forEach((user: User) => {
    allCode.push(user.code)
  })
  const allLedger = await (
    prisma[
      LEDGER[requestedUsersRole as keyof typeof LEDGER] as keyof typeof prisma
    ] as any
  ).findMany({
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
  })
  return allLedger
}
