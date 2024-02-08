import { Request, Response } from 'express'

import { getAllLedgerHandler } from '../handlers/get-all-ledger.handler'
import { User } from '../ts/interfaces'
import { ROLES, Roles } from '../ts/type'
import { CONST } from '../constants'

const GetLedgerController =
  (role: Roles) => async (req: Request, res: Response) => {
    const code = (req.user as User).code as string
    const page = parseInt(req.query.page as string)
    const limit = parseInt(req.query.limit as string) || CONST.take
    const result = await getAllLedgerHandler({
      code,
      requestedUsersRole: role,
      page,
      limit
    })
    return res.status(200).json({
      data: result
    })
  }

export const getAllSubadminLedgerController = GetLedgerController(
  ROLES.Subadmin
)
export const getAllMasterLedgerController = GetLedgerController(ROLES.Master)
export const getAllSuperagentLedgerController = GetLedgerController(
  ROLES.Superagent
)
export const getAllAgentLedgerController = GetLedgerController(ROLES.Agent)
export const getAllClientLedgerController = GetLedgerController(ROLES.Client)
