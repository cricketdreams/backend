import { prisma } from '../prisma/prisma'

export const getLedgerHandler = async ({
  userLegder,
  code,
  limit,
  page
}: {
  userLegder: string
  code: string
  page?: number
  limit: number
}) => {
  const ledger = await (
    prisma[userLegder as keyof typeof prisma] as any
  ).findMany({
    where: {
      code: code
    },
    orderBy: {
      createdAt: 'desc'
    },
    skip: page ? (page - 1) * limit : 0,
    take: limit
  })

  return {
    success: true,
    data: ledger
  }
}
