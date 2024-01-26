import { Request } from 'express'

import { prisma } from '../prisma/prisma'
import { LIMIT_OPERATION, LimitOperation, Roles } from '../ts/type'
import { getUserType } from '../utils/user-type'
import { limitValidator } from '../validators/general.validator'
import { getUserHandler } from './user/get-user.handler'

const updateLimits = async (
  childCode: string,
  childType: Roles,
  parentType: Roles,
  limitChange: number
) => {
  const child = await (prisma[childType as keyof typeof prisma] as any).update({
    where: { code: childCode },
    data: { limit: { increment: limitChange } }
  })
  await (prisma[parentType as keyof typeof prisma] as any).update({
    where: { code: child.upLinkCode },
    data: { limit: { decrement: limitChange } }
  })
}

export const handleLimitOperation = async (
  req: Request,
  limitOperation: LimitOperation
) => {
  const { parentCode, childCode, limit } = limitValidator.parse(req.body)

  const parentType = getUserType(parentCode)
  const childType = getUserType(childCode)
  const parent = await getUserHandler(parentCode, parentType as Roles)
  const child = await getUserHandler(childCode, childType as Roles)

  if (!child || child.status === false) {
    return `${childType} inactive`
  }

  if (parent.limit < limit) {
    return `Insufficient ${parentType} limit`
  }

  const limitChange = limitOperation === LIMIT_OPERATION.Add ? limit : -limit

  await updateLimits(childCode, childType, parentType, limitChange)

  return true
}
