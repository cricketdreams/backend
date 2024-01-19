import { Request } from 'express'

import { prisma } from '../prisma/prisma'
import { Roles } from '../ts/type'

export const activeHandler = async (req: Request, role: Roles) => {
  const { code } = req.body
  const result = await (prisma[role as keyof typeof prisma] as any).update({
    where: {
      code: code
    },
    data: {
      status: true
    }
  })
  return result
}

export const deactiveHandler = async (req: Request, role: Roles) => {
  const { code } = req.body
  const result = await (prisma[role as keyof typeof prisma] as any).update({
    where: {
      code: code
    },
    data: {
      status: false
    }
  })
  return result
}
