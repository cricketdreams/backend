import { prisma } from '../../prisma/prisma'
import { LEDGER } from '../../ts/type'
import { getUserType } from '../../utils/user-type'

export const lenaHandler = async (
  {
    amount,
    recipient,
    description,
    userCode
  }: {
    amount: number
    recipient: string
    description: string
    userCode: string
  },
  paymentType: string
) => {
  const userType = getUserType(recipient)
  const userLegder = LEDGER[userType as keyof typeof LEDGER]
  const recipientLastTransaction = await (
    prisma[userLegder as keyof typeof prisma] as any
  ).findFirst({
    where: {
      code: recipient as string
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 1
  })
  const transactionAdded = await (
    prisma[userLegder as keyof typeof prisma] as any
  ).create({
    data: {
      code: recipient,
      balance: recipientLastTransaction
        ? recipientLastTransaction.balance + amount
        : amount,
      credit: 0,
      debit: amount,
      description: description,
      type: paymentType,
      kisnekara: userCode
    }
  })
  return { success: true, data: transactionAdded }
}
