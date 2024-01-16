import { Request, Response } from 'express'

import { User } from '../ts/enum'
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
  if (userType === 'client') {
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

  if (upLinkType === 'admin') {
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
  } else if (upLinkType === 'subadmin') {
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
  } else if (upLinkType === 'master') {
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
  } else if (upLinkType === 'superagent') {
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
  } else if (upLinkType === 'agent') {
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

    const response = await createUser(data, User.ADMIN, User.SUBADMIN)
    res.status(201).json(response)
  } catch (error) {
    throw error
  }
}

export const createMasterHandler = async (req: Request, res: Response) => {
  try {
    const data = req.body

    const response = await createUser(data, User.SUBADMIN, User.MASTER)
    res.status(201).json(response)
  } catch (error) {
    throw error
  }
}

export const createSuperagentHandler = async (req: Request, res: Response) => {
  try {
    const data = req.body

    const response = await createUser(data, User.MASTER, User.SUPERAGENT)
    res.status(201).json(response)
  } catch (error) {
    throw error
  }
}

export const createAgentHandler = async (req: Request, res: Response) => {
  try {
    const data = req.body

    const response = await createUser(data, User.SUPERAGENT, User.AGENT)
    res.status(201).json(response)
  } catch (error) {
    throw error
  }
}

export const createClientHandler = async (req: Request, res: Response) => {
  try {
    const data = req.body

    const response = await createUser(data, User.AGENT, User.CLIENT)
    res.status(201).json(response)
  } catch (error) {
    throw error
  }
}
