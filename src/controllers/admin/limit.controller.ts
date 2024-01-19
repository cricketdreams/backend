import { Request, Response } from 'express'

import { prisma } from '../../prisma/prisma'
import { getUserHandler } from '../../handlers/user/get-user.handler'
import { ROLES } from '../../ts/type'

// Subadmin Limit
export const addLimitSubadminController = async (
  req: Request,
  res: Response
) => {
  const { subadminCode, limit, limitType } = req.body

  const subadmin = await getUserHandler(subadminCode, ROLES.Subadmin)
  await prisma.subadmin.update({
    where: {
      code: subadminCode
    },
    data: {
      limit: subadmin.limit + limit
    }
  })
  return res.status(200)
}

export const subtractLimitSubadminController = async (
  req: Request,
  res: Response
) => {
  const { subadminCode, limit, limitType } = req.body

  const subadmin = await getUserHandler(subadminCode, ROLES.Subadmin)
  await prisma.subadmin.update({
    where: {
      code: subadminCode
    },
    data: {
      limit: subadmin.limit - limit
    }
  })

  return res.status(200)
}

// Master Limit
export const addLimitMasterController = async (req: Request, res: Response) => {
  const { subadminCode, masterCode, limit, limitType } = req.body

  const subadmin = await getUserHandler(subadminCode, ROLES.Subadmin)
  const master = await getUserHandler(masterCode, ROLES.Master)
  if (master?.status === false) {
    return res.status(400).json({
      message: 'Master inactive'
    })
  } else if (subadmin.limit <= limit) {
    return res.status(400).json({
      message: 'Insuffient subadmin limit'
    })
  } else {
    await prisma.master.update({
      where: {
        code: masterCode
      },
      data: {
        limit: master.limit + limit
      }
    })
    await prisma.subadmin.update({
      where: {
        code: subadmin.code
      },
      data: {
        limit: subadmin.limit - limit
      }
    })
  }
  return res.status(200)
}

export const subtractLimitMasterController = async (
  req: Request,
  res: Response
) => {
  const { subadminCode, masterCode, limit, limitType } = req.body

  const subadmin = await getUserHandler(subadminCode, ROLES.Subadmin)
  const master = await getUserHandler(masterCode, ROLES.Master)
  if (master.limit <= limit) {
    return res.status(400).json({
      message: 'Insufficent master limit'
    })
  } else {
    await prisma.master.update({
      where: {
        code: masterCode
      },
      data: {
        limit: master.limit - limit
      }
    })
    await prisma.subadmin.update({
      where: {
        code: subadmin.code
      },
      data: {
        limit: subadmin.limit + limit
      }
    })
  }
  return res.status(200)
}

// Superagent Limit
export const addLimitSuperagentController = async (
  req: Request,
  res: Response
) => {
  const { masterCode, superagentCode, limit, limitType } = req.body

  const master = await getUserHandler(masterCode, ROLES.Master)
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
  const { masterCode, superagentCode, limit, limitType } = req.body

  const master = await getUserHandler(masterCode, ROLES.Master)
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
