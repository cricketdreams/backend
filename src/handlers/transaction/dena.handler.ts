import { prisma } from '../../prisma/prisma'
import { getUserType } from '../../utils/user-type'

export const denaHandler = async (
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
  const userType = getUserType(recipient).toLowerCase()
  const userLegder: string = userType + 'Ledger'
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
        ? recipientLastTransaction.balance - amount
        : -amount,
      credit: amount,
      debit: 0,
      description: description,
      type: paymentType,
      kisnekara: userCode
    }
  })
  return { success: true, data: transactionAdded }
}
