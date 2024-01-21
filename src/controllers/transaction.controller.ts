import { Request, Response } from 'express'
import { denaHandler } from '../handlers/transaction/dena.handler'
import { lenaHandler } from '../handlers/transaction/lena.handler'

export const denaTransactionController = async (
  req: Request,
  res: Response
) => {
  const data = await denaHandler(req, 'Payment Paid')
  return res.json({ data })
}

export const lenaTransactionController = async (
  req: Request,
  res: Response
) => {
  const data = await lenaHandler(req, 'Payment Received')
  return res.json({ data })
}
