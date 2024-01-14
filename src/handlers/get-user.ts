import { prisma } from '../prisma/prisma'
import { Roles } from '../ts/type'
import { logger } from '../utils/logger'

export async function getUserHandler(code: string, userType: Roles) {
  const user = await (
    prisma[userType as keyof typeof prisma] as any
  ).findUnique({
    where: {
      code: code
    }
  })
  if (!user) {
    logger.debug(`Null, ${userType} not found`)
    throw new Error(`${userType} not found`)
  } else {
    return user
  }
}
