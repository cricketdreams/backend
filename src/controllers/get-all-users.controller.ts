import { Request, Response } from 'express'

import { getAllUsersHandler } from '../handlers/get-all-users.handler'
import { ROLES } from '../ts/type'
import { User } from '../ts/interfaces'

export const getAllSubadminController = async (req: Request, res: Response) => {
  const user = req.user as User
  const result = await getAllUsersHandler(user, ROLES.Subadmin)
  return res.status(200).json({
    data: result
  })
}

export const getAllMasterController = async (req: Request, res: Response) => {
  const user = req.user as User
  const result = await getAllUsersHandler(user, ROLES.Master)
  return res.status(200).json({
    data: result
  })
}

export const getAllSuperagentController = async (
  req: Request,
  res: Response
) => {
  const user = req.user as User
  const result = await getAllUsersHandler(user, ROLES.Superagent)
  return res.status(200).json({
    data: result
  })
}

export const getAllAgentController = async (req: Request, res: Response) => {
  const user = req.user as User
  const result = await getAllUsersHandler(user, ROLES.Agent)
  return res.status(200).json({
    data: result
  })
}

export const getAllClientController = async (req: Request, res: Response) => {
  const user = req.user as User
  const result = await getAllUsersHandler(user, ROLES.Client)
  return res.status(200).json({
    data: result
  })
}
