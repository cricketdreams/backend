import { Request, Response } from 'express'
import { denaHandler } from '../handlers/transaction/dena.handler'
import { lenaHandler } from '../handlers/transaction/lena.handler'
import { User } from '../ts/interfaces'

export const denaTransactionController = async (
  req: Request,
  res: Response
) => {
  const { amount, recipient, description } = req.body
  const userCode = (req.user as User).code
  const data = await denaHandler(
    {
      amount,
      recipient,
      description,
      userCode
    },
    'Payment Paid'
  )
  return res.json({ data })
}

export const lenaTransactionController = async (
  req: Request,
  res: Response
) => {
  const { amount, recipient, description } = req.body
  const userCode = (req.user as User).code
  const data = await lenaHandler(
    {
      amount,
      recipient,
      description,
      userCode
    },
    'Payment Received'
  )
  return res.json({ data })
}
