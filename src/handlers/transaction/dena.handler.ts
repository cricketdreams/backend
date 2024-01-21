import { Request } from 'express'
import { User } from '../../ts/interfaces'
import { USER_CODE } from '../../ts/type'
import { prisma } from '../../prisma/prisma'

export const denaHandler = async (req: Request, paymentType: string) => {
  const user = req.user as User
  const { amount, recipient, description } = req.body
  const userTypeCode: string = recipient.slice(0, 2)
  const userLegder: string =
    USER_CODE[userTypeCode as keyof typeof USER_CODE].toLowerCase() + 'Ledger'
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
