import { Request, Response } from 'express'

import { User } from '../../ts/interfaces'
import { prisma } from '../../prisma/prisma'
import { getUserHandler } from '../../handlers/get-user.handler'
import { ROLES } from '../../ts/type'

// Agent Limit
export const addLimitClientController = async (req: Request, res: Response) => {
  const { clientCode, limit, limitType } = req.body
  const agent = req.user as User
  const client = await getUserHandler(clientCode, ROLES.Client)
  if (client?.status === false) {
    return res.status(400).json({
      message: 'Client inactive'
    })
  } else if (agent.limit <= limit) {
    return res.status(400).json({
      message: 'Insuffient agent limit'
    })
  } else {
    await prisma.client.update({
      where: {
        code: clientCode
      },
      data: {
        limit: client.limit + limit
      }
    })
    await prisma.agent.update({
      where: {
        code: agent.code
      },
      data: {
        limit: agent.limit - limit
      }
    })
  }
  return res.status(200)
}

export const subtractLimitClientController = async (
  req: Request,
  res: Response
) => {
  const { clientCode, limit, limitType } = req.body

  const agent = req.user as User
  const client = await getUserHandler(clientCode, ROLES.Client)
  if (client.limit <= limit) {
    return res.status(400).json({
      message: 'Insufficent client limit'
    })
  } else {
    await prisma.client.update({
      where: {
        code: clientCode
      },
      data: {
        limit: client.limit - limit
      }
    })
    await prisma.agent.update({
      where: {
        code: agent.code
      },
      data: {
        limit: agent.limit + limit
      }
    })
  }
  return res.status(200)
}
