import { Request } from 'express'
import { prisma } from '../../prisma/prisma'
import { User } from '../../ts/interfaces'
import { getUserType } from '../../utils/user-type'

export const denaHandler = async (req: Request, paymentType: string) => {
  const user = req.user as User
  const { amount, recipient, description } = req.body
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
      kisnekara: user.code
    }
  })
  return { success: true, data: transactionAdded }
}
