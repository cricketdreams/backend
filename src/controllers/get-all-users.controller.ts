import { Request, Response } from 'express'

import { getAllUsersHandler } from '../handlers/user/get-all-users.handler'
import { ROLES, Roles } from '../ts/type'
import { User } from '../ts/interfaces'

const GetAllUsersByRoleController = async (
  req: Request,
  res: Response,
  role: Roles
) => {
  const user = req.user as User
  const result = await getAllUsersHandler(user, role)
  return res.status(200).json({
    data: result
  })
}

export const getAllSubadminController = async (req: Request, res: Response) => {
  return GetAllUsersByRoleController(req, res, ROLES.Subadmin)
}

export const getAllMasterController = async (req: Request, res: Response) => {
  return GetAllUsersByRoleController(req, res, ROLES.Master)
}

export const getAllSuperagentController = async (
  req: Request,
  res: Response
) => {
  return GetAllUsersByRoleController(req, res, ROLES.Superagent)
}

export const getAllAgentController = async (req: Request, res: Response) => {
  return GetAllUsersByRoleController(req, res, ROLES.Agent)
}

export const getAllClientController = async (req: Request, res: Response) => {
  return GetAllUsersByRoleController(req, res, ROLES.Client)
}