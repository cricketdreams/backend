import { Request, Response } from 'express'
import { getUserHandler } from '../handlers/user/get-user.handler'
import { User } from '../ts/interfaces'
import { checkAppropriateRoleAction } from '../utils/check-appropriate-role-action'
import { decryptData } from '../utils/crypt'
import { getUserType } from '../utils/user-type'
import { codeValidator } from '../validators/general.validator'
import { ROLES } from '../ts/type'

export const getUserController = async (req: Request, res: Response) => {
  const { code } = codeValidator.parse(req.body)
  const requestedUserRole = getUserType(code as string)
  const role = (req.user as User).role

  if (
    role !== ROLES.Admin &&
    !checkAppropriateRoleAction({
      parentType: role,
      childType: requestedUserRole
    })
  )
    return res.status(403).json({ message: 'FORBIDDEN' })

  const result = await getUserHandler(code as string, requestedUserRole)
  result.password = await decryptData(result.password)
  return res.status(200).json({
    data: result
  })
}
