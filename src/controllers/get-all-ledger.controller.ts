import { Request, Response } from 'express'

import { getAllLedgerHandler } from '../handlers/get-all-ledger.handler'
import { User } from '../ts/interfaces'
import { ROLES, Roles } from '../ts/type'
import { codeValidator } from '../validators/general.validator'

const getAllLedger = async (req: Request, res: Response, role: Roles) => {
  let { code } = codeValidator.parse(req.body)
  if (!code) {
    code = (req.user as User).code as string
  }
  const result = await getAllLedgerHandler(code, role)
  return res.status(200).json({
    data: result
  })
}

export const getAllSubadminLedger = async (req: Request, res: Response) => {
  return await getAllLedger(req, res, ROLES.Subadmin)
}

export const getAllMasterLedger = async (req: Request, res: Response) => {
  return await getAllLedger(req, res, ROLES.Master)
}

export const getAllSuperagentLedger = async (req: Request, res: Response) => {
  return await getAllLedger(req, res, ROLES.Superagent)
}

export const getAllAgentLedger = async (req: Request, res: Response) => {
  return await getAllLedger(req, res, ROLES.Agent)
}

export const getAllClientLedger = async (req: Request, res: Response) => {
  return await getAllLedger(req, res, ROLES.Client)
}
