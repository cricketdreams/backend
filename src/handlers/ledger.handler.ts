import { prisma } from "../prisma/prisma"

export const getLedgerHandler = async (userLegder: string, code: string) => {
  const ledger = await (
    prisma[userLegder as keyof typeof prisma] as any
  ).findMany({
    where: {
      code: code
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return {
    success: true,
    data: ledger
  }
}