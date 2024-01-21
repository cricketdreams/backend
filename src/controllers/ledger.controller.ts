import { Request, Response } from 'express'
import { getLedgerHandler } from '../handlers/ledger.handler'
import { User } from '../ts/interfaces'
import { getUserType } from '../utils/user-type'

export const ledgerController = async (req: Request, res: Response) => {
  let { code } = req.body
  if (code === undefined) {
    code = (req.user as User).code
  }
  const userType = getUserType(code).toLowerCase()
  const userLegder: string = userType + 'Ledger'

  const data = await getLedgerHandler(userLegder, code)

  res.status(200).json({data})
}
