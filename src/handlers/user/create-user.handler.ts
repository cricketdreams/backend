import { Request, Response } from 'express'

import { prisma } from '../../prisma/prisma'
import { CreateUserBody } from '../../ts/interfaces'
import { ROLES, Roles } from '../../ts/type'
import { encryptData } from '../../utils/crypt'
import generateCode from '../../utils/generate-code'
import { createUserBodySchema } from '../../validators/general.validator'
import { generatePassword } from '../../utils/generate-password'

const createUser = async (
  data: CreateUserBody,
  upLinkType: Roles,
  userType: Roles
) => {
  createUserBodySchema.parse(data)
  const {
    upLinkCode,
    name,
    mobile,
    reference,
    share,
    sessionCommission,
    matchCommission,
    mobileShare,
    mobileCharge
  } = data
  const upLinkData = await (
    prisma[upLinkType as keyof typeof prisma] as any
  ).findUnique({
    where: {
      code: upLinkCode
    }
  })
  if (!upLinkData) throw new Error('Uplink not found')
  const password = generatePassword()
  const encryptedPassword = await encryptData(password)
  const code = await generateCode(userType)
  let result

  if (userType === ROLES.Subadmin) {
    result = await prisma.subadmin.create({
      data: {
        code,
        name,
        password: encryptedPassword,
        mobile,
        reference,
        sessionCommission,
        matchCommission,
        mobileShare,
        share,
        upLinkCode,
        limit: 0
      }
    })
  } else if (userType === ROLES.Master) {
    result = await prisma.master.create({
      data: {
        code,
        name,
        password: encryptedPassword,
        mobile,
        reference,
        sessionCommission,
        matchCommission,
        mobileShare,
        share,
        upLinkCode,
        adminCode: upLinkData.upLinkCode,
        limit: 0
      }
    })
  } else if (userType === ROLES.Superagent) {
    result = await prisma.superagent.create({
      data: {
        code,
        name,
        password: encryptedPassword,
        mobile,
        reference,
        sessionCommission,
        matchCommission,
        mobileShare,
        share,
        upLinkCode,
        adminCode: upLinkData.adminCode,
        subadminCode: upLinkData.upLinkCode,
        limit: 0
      }
    })
  } else if (userType === ROLES.Agent) {
    result = await prisma.agent.create({
      data: {
        code,
        name,
        password: encryptedPassword,
        mobile,
        reference,
        sessionCommission,
        matchCommission,
        mobileShare,
        share,
        upLinkCode,
        adminCode: upLinkData.adminCode,
        subadminCode: upLinkData.subadminCode,
        masterCode: upLinkData.upLinkCode,
        limit: 0
      }
    })
  } else if (userType === ROLES.Client) {
    result = await prisma.client.create({
      data: {
        code,
        name,
        password: encryptedPassword,
        mobile,
        reference,
        sessionCommission,
        matchCommission,
        mobileCharge,
        upLinkCode,
        adminCode: upLinkData.adminCode,
        subadminCode: upLinkData.subadminCode,
        masterCode: upLinkData.masterCode,
        superagentCode: upLinkData.upLinkCode,
        limit: 0
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
