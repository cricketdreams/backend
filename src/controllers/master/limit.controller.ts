import { Request, Response } from 'express'

import { User } from '../../ts/interfaces'
import { prisma } from '../../prisma/prisma'
import { getUserHandler } from '../../handlers/get-user.handler'
import { ROLES } from '../../ts/type'

// Superagent Limit
export const addLimitSuperagentController = async (
  req: Request,
  res: Response
) => {
  const { superagentCode, limit, limitType } = req.body

  const master = req.user as User
  const superagent = await getUserHandler(superagentCode, ROLES.Superagent)
  if (superagent?.status === false) {
    return res.status(400).json({
      message: 'Superagent inactive'
    })
  } else if (master.limit <= limit) {
    return res.status(400).json({
      message: 'Insuffient master limit'
    })
  } else {
    await prisma.superagent.update({
      where: {
        code: superagentCode
      },
      data: {
        limit: superagent.limit + limit
      }
    })
    await prisma.master.update({
      where: {
        code: master.code
      },
      data: {
        limit: master.limit - limit
      }
    })
  }
  return res.status(200)
}

export const subtractLimitSuperagentController = async (
  req: Request,
  res: Response
) => {
  const { superagentCode, limit, limitType } = req.body

  const master = req.user as User
  const superagent = await getUserHandler(superagentCode, ROLES.Superagent)
  if (superagent.limit <= limit) {
    return res.status(400).json({
      message: 'Insufficent superagent limit'
    })
  } else {
    await prisma.superagent.update({
      where: {
        code: superagentCode
      },
      data: {
        limit: superagent.limit - limit
      }
    })
    await prisma.master.update({
      where: {
        code: master.code
      },
      data: {
        limit: master.limit + limit
      }
    })
  }
  return res.status(200)
}

// Agent Limit
export const addLimitAgentController = async (req: Request, res: Response) => {
  const { superagentCode, agentCode, limit, limitType } = req.body

  const superagent = await getUserHandler(superagentCode, ROLES.Superagent)
  const agent = await getUserHandler(agentCode, ROLES.Agent)
  if (superagent?.status === false) {
    return res.status(400).json({
      message: 'Superagent inactive'
    })
  } else if (superagent.limit <= limit) {
    return res.status(400).json({
      message: 'Insuffient superagent limit'
    })
  } else {
    await prisma.agent.update({
      where: {
        code: agentCode
      },
      data: {
        limit: agent.limit + limit
      }
    })
    await prisma.superagent.update({
      where: {
        code: superagent.code
      },
      data: {
        limit: superagent.limit - limit
      }
    })
  }
  return res.status(200)
}

export const subtractLimitAgentController = async (
  req: Request,
  res: Response
) => {
  const { superagentCode, agentCode, limit, limitType } = req.body

  const superagent = await getUserHandler(superagentCode, ROLES.Superagent)
  const agent = await getUserHandler(agentCode, ROLES.Agent)
  if (agent.limit <= limit) {
    return res.status(400).json({
      message: 'Insufficent agent limit'
    })
  } else {
    await prisma.agent.update({
      where: {
        code: agentCode
      },
      data: {
        limit: agent.limit - limit
      }
    })
    await prisma.superagent.update({
      where: {
        code: superagent.code
      },
      data: {
        limit: superagent.limit + limit
      }
    })
  }
  return res.status(200)
}

// Client Limit
export const addLimitClientController = async (req: Request, res: Response) => {
  const { clientCode, agentCode, limit, limitType } = req.body

  const agent = await getUserHandler(agentCode, ROLES.Agent)
  const client = await getUserHandler(clientCode, ROLES.Client)
  if (client?.status === false) {
    return res.status(400).json({
      message: 'Client inactive'
    })
  } else if (agent.limit < limit) {
    return res.status(400).json({
      message: 'Insuffient agent limit'
    })
  } else {
    await prisma.client.update({
      where: {
        code: clientCode
      },
      data: {
        limit: agent.limit + limit
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
  const { clientCode, agentCode, limit, limitType } = req.body

  const agent = await getUserHandler(agentCode, ROLES.Agent)
  const client = await getUserHandler(clientCode, ROLES.Client)
  if (client.limit < limit) {
    return res.status(400).json({
      message: 'Insufficent agent limit'
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