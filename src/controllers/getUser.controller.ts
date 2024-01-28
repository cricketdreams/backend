import { Request, Response } from 'express'
import { getUserHandler } from '../handlers/user/get-user.handler'
import { User } from '../ts/interfaces'
import { ROLES } from '../ts/type'
import { getUserType } from '../utils/user-type'
import { codeValidator } from '../validators/general.validator'
import { decryptData } from '../utils/crypt'

export const getUserController = async (req: Request, res: Response) => {
  const { code } = codeValidator.parse(req.body)
  const requestedUserRole = getUserType(code as string)
  const role = (req.user as User).role

  const authorizedRoles: { [key: string]: string[] } = {
    [ROLES.Admin]: [
      ROLES.Subadmin,
      ROLES.Master,
      ROLES.Superagent,
      ROLES.Agent,
      ROLES.Client
    ],
    [ROLES.Subadmin]: [
      ROLES.Master,
      ROLES.Superagent,
      ROLES.Agent,
      ROLES.Client
    ],
    [ROLES.Master]: [ROLES.Superagent, ROLES.Agent, ROLES.Client],
    [ROLES.Superagent]: [ROLES.Agent, ROLES.Client],
    [ROLES.Agent]: [ROLES.Client]
  }

  if (
    role in authorizedRoles &&
    authorizedRoles[role].includes(requestedUserRole)
  ) {
    const result = await getUserHandler(code as string, requestedUserRole)
    result.password = await decryptData(result.password)
    return res.status(200).json({
      data: result
    })
  } else {
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }
}
