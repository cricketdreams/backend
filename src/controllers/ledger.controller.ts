import { Request, Response } from 'express'
import { getLedgerHandler } from '../handlers/ledger.handler'
import { User } from '../ts/interfaces'
import { LEDGER } from '../ts/type'
import { getUserType } from '../utils/user-type'
import { codeValidator } from '../validators/general.validator'

export const ledgerController = async (req: Request, res: Response) => {
  let { code } = codeValidator.parse(req.body)
  if (code === undefined) {
    code = (req.user as User).code
  }
  const userType = getUserType(code)
  const userLegder = LEDGER[userType as keyof typeof LEDGER]
  const data = await getLedgerHandler(userLegder, code)

  res.status(200).json({ data })
}
