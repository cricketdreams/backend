import { Request, Response } from 'express'

import { getAllUsersHandler } from '../handlers/user/get-all-users.handler'
import { User } from '../ts/interfaces'
import { ROLES, Roles } from '../ts/type'
import { codeValidator } from '../validators/general.validator'
import { CONST } from '../constants'

const GetUsersByRoleController =
  (role: Roles) => async (req: Request, res: Response) => {
    let { code } = codeValidator.parse(req.body)
    const userCode = code || ((req.user as User).code as string)
    const page = parseInt(req.query.page as string)
    const limit = parseInt(req.query.limit as string) || CONST.take
    const result = await getAllUsersHandler({ code: userCode, requestedUsersRole: role, limit, page})
    return res.status(200).json({
      data: result
    })
  }

export const getAllSubadminController = GetUsersByRoleController(ROLES.Subadmin)
export const getAllMasterController = GetUsersByRoleController(ROLES.Master)
export const getAllSuperagentController = GetUsersByRoleController(
  ROLES.Superagent
)
export const getAllAgentController = GetUsersByRoleController(ROLES.Agent)
export const getAllClientController = GetUsersByRoleController(ROLES.Client)
