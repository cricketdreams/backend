import { Request, Response } from 'express'

import { getAllUsersHandler } from '../handlers/user/get-all-users.handler'
import { ROLES, Roles } from '../ts/type'
import { User } from '../ts/interfaces'

const getAllUsersByRoleController = async (
  req: Request,
  res: Response,
  role: Roles
) => {
  let { code } = req.body
  if (!code) {
    code = (req.user as User).code as string
  }
  const result = await getAllUsersHandler(code, role)
  return res.status(200).json({
    data: result
  })
}

export const getAllSubadminController = async (req: Request, res: Response) => {
  return await getAllUsersByRoleController(req, res, ROLES.Subadmin)
}

export const getAllMasterController = async (req: Request, res: Response) => {
  return await getAllUsersByRoleController(req, res, ROLES.Master)
}

export const getAllSuperagentController = async (
  req: Request,
  res: Response
) => {
  return await getAllUsersByRoleController(req, res, ROLES.Superagent)
}

export const getAllAgentController = async (req: Request, res: Response) => {
  return await getAllUsersByRoleController(req, res, ROLES.Agent)
}

export const getAllClientController = async (req: Request, res: Response) => {
  return await getAllUsersByRoleController(req, res, ROLES.Client)
}
