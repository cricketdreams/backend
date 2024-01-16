import { Request, Response } from 'express'

import { ROLES } from '../ts/type'
import { CreateUserBody } from '../ts/interfaces'
import { prisma } from '../prisma/prisma'
import generateCode from '../utils/generateCode'
import { Roles } from '../ts/type'
import { hashPassword } from '../utils/password'

const createUser = async (
  data: CreateUserBody,
  upLinkType: Roles,
  userType: Roles
) => {
  console.log(upLinkType, userType, 'data')
  const {
    upLinkCode,
    name,
    password,
    mobile,
    reference,
    share,
    sessionCommission,
    matchCommission,
    mobileCommission
  } = data
  const upLinkData = await (
    prisma[upLinkType as keyof typeof prisma] as any
  ).findUnique({
    where: {
      code: upLinkCode
    }
  })
  if (!upLinkData) throw new Error('Uplink not found')
  const hashedPassword = await hashPassword(password)
  const code = await generateCode(userType)
  let result
  if (userType === ROLES.Client) {
    result = await prisma.client.create({
      data: {
        code,
        name,
        password: hashedPassword,
        mobile,
        reference,
        sessionCommission,
        matchCommission,
        mobileCommission,
        upLinkCode,
        limit: 0
      }
    })
  } else {
    result = await (prisma[userType as keyof typeof prisma] as any).create({
      data: {
        code,
        name,
        password: hashedPassword,
        mobile,
        reference,
        share,
        sessionCommission,
        matchCommission,
        mobileCommission,
        upLinkCode,
        limit: 0
      }
    })
  }

  if (upLinkType === ROLES.Admin) {
    await (prisma[upLinkType as keyof typeof prisma] as any).update({
      where: {
        code: upLinkCode
      },
      data: {
        subadmin: {
          connect: {
            code: result.code
          }
        }
      }
    })
  } else if (upLinkType === ROLES.Subadmin) {
    await (prisma[upLinkType as keyof typeof prisma] as any).update({
      where: {
        code: upLinkCode
      },
      data: {
        master: {
          connect: {
            code: result.code
          }
        }
      }
    })
  } else if (upLinkType === ROLES.Master) {
    await (prisma[upLinkType as keyof typeof prisma] as any).update({
      where: {
        code: upLinkCode
      },
      data: {
        superagent: {
          connect: {
            code: result.code
          }
        }
      }
    })
  } else if (upLinkType === ROLES.Superagent) {
    await (prisma[upLinkType as keyof typeof prisma] as any).update({
      where: {
        code: upLinkCode
      },
      data: {
        agent: {
          connect: {
            code: result.code
          }
        }
      }
    })
  } else if (upLinkType === ROLES.Agent) {
    await (prisma[upLinkType as keyof typeof prisma] as any).update({
      where: {
        code: upLinkCode
      },
      data: {
        client: {
          connect: {
            code: result.code
          }
        }
      }
    })
  }
  // add to report

  return {
    data: result,
    message: `${userType} created successfully`
  }
}

export const createSubadminHandler = async (req: Request, res: Response) => {
  try {
    const data = req.body

    const response = await createUser(data, ROLES.Admin, ROLES.Subadmin)
    res.status(201).json(response)
  } catch (error) {
    throw error
  }
}

export const createMasterHandler = async (req: Request, res: Response) => {
  try {
    const data = req.body

    const response = await createUser(data, ROLES.Subadmin, ROLES.Master)
    res.status(201).json(response)
  } catch (error) {
    throw error
  }
}

export const createSuperagentHandler = async (req: Request, res: Response) => {
  try {
    const data = req.body

    const response = await createUser(data, ROLES.Master, ROLES.Superagent)
    res.status(201).json(response)
  } catch (error) {
    throw error
  }
}

export const createAgentHandler = async (req: Request, res: Response) => {
  try {
    const data = req.body

    const response = await createUser(data, ROLES.Superagent, ROLES.Agent)
    res.status(201).json(response)
  } catch (error) {
    throw error
  }
}

export const createClientHandler = async (req: Request, res: Response) => {
  try {
    const data = req.body

    const response = await createUser(data, ROLES.Agent, ROLES.Client)
    res.status(201).json(response)
  } catch (error) {
    throw error
  }
}
