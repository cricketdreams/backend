import { Request, Response } from 'express'

import { getLedgerHandler } from '../handlers/ledger.handler'
import { User } from '../ts/interfaces'
import { LEDGER } from '../ts/type'
import { checkAppropriateRoleAction } from '../utils/check-appropriate-role-action'
import { getUserType } from '../utils/user-type'
import { codeValidator } from '../validators/general.validator'
import { CONST } from '../constants'

export const ledgerController = async (req: Request, res: Response) => {
  let { code } = codeValidator.parse(req.body)
  if (code === undefined) {
    code = (req.user as User).code
  }
  const role = (req.user as User).role
  const page = parseInt(req.query.page as string)
  const limit = parseInt(req.query.limit as string) || CONST.take
  const userType = getUserType(code)

  if (
    role !== userType &&
    !checkAppropriateRoleAction({ parentType: role, childType: userType })
  )
    return res.status(403).json({ message: 'FORBIDDEN' })

  const userLegder = LEDGER[userType as keyof typeof LEDGER]
  const data = await getLedgerHandler({ userLegder, code, limit, page })

  res.status(200).json({ data })
}
