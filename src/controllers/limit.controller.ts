import { Request, Response } from 'express'

import { handleLimitOperation } from '../handlers/limit.handler'
import { denaHandler } from '../handlers/transaction/dena.handler'
import { lenaHandler } from '../handlers/transaction/lena.handler'
import { getUserHandler } from '../handlers/user/get-user.handler'
import { prisma } from '../prisma/prisma'
import { User } from '../ts/interfaces'
import { LIMIT_OPERATION, ROLES } from '../ts/type'
import { z } from 'zod'

// Subadmin Limit

const subadminLimitValidator = z.object({
  subadminCode: z.string().min(8, { message: 'code is invalid' }),
  limit: z.number().min(0, { message: 'limit is invalid' })
})
export const addLimitSubadminController = async (
  req: Request,
  res: Response
) => {
  const { subadminCode, limit } = subadminLimitValidator.parse(req.body)
  const subadmin = await getUserHandler(subadminCode, ROLES.Subadmin)
  await prisma.subadmin.update({
    where: {
      code: subadminCode
    },
    data: {
      limit: subadmin.limit + limit
    }
  })
  return res.json({
    success: true
  })
}

export const subtractLimitSubadminController = async (
  req: Request,
  res: Response
) => {
  const { subadminCode, limit } = subadminLimitValidator.parse(req.body)

  const subadmin = await getUserHandler(subadminCode, ROLES.Subadmin)
  await prisma.subadmin.update({
    where: {
      code: subadminCode
    },
    data: {
      limit: subadmin.limit - limit
    }
  })

  return res.json({
    success: true
  })
}

// Master Limit
export const addLimitMasterController = async (req: Request, res: Response) => {
  const result = await handleLimitOperation(req, LIMIT_OPERATION.Add)
  return result === true
    ? res.json({
        success: true
      })
    : res.send(400).json({ message: result })
}

export const subtractLimitMasterController = async (
  req: Request,
  res: Response
) => {
  const result = await handleLimitOperation(req, LIMIT_OPERATION.Subtract)
  return result === true
    ? res.json({
        success: true
      })
    : res.send(400).json({ message: result })
}

// Super Agent Limit
export const addLimitSuperagentController = async (
  req: Request,
  res: Response
) => {
  const result = await handleLimitOperation(req, LIMIT_OPERATION.Add)
  return result === true
    ? res.json({
        success: true
      })
    : res.send(400).json({ message: result })
}

export const subtractLimitSuperagentController = async (
  req: Request,
  res: Response
) => {
  const result = await handleLimitOperation(req, LIMIT_OPERATION.Subtract)
  return result === true
    ? res.json({
        success: true
      })
    : res.send(400).json({ message: result })
}

// Agent Limit
export const addLimitAgentController = async (req: Request, res: Response) => {
  const result = await handleLimitOperation(req, LIMIT_OPERATION.Add)
  return result === true
    ? res.json({
        success: true
      })
    : res.send(400).json({ message: result })
}

export const subtractLimitAgentController = async (
  req: Request,
  res: Response
) => {
  const result = await handleLimitOperation(req, LIMIT_OPERATION.Subtract)
  return result === true
    ? res.json({
        success: true
      })
    : res.send(400).json({ message: result })
}

// Client Limit
export const addLimitClientController = async (req: Request, res: Response) => {
  const userRole = (req.user as User).role
  const userCode = (req.user as User).code
  const limitType = req.body.limitType

  const result = await handleLimitOperation(req, LIMIT_OPERATION.Add)

  if (limitType === 'CASH') {
    await lenaHandler(
      {
        amount: req.body.limit,
        recipient: req.body.childCode,
        description: `Limit added by ${userRole}`,
        userCode
      },
      'Payment Recieved'
    )
  }

  return result === true
    ? res.json({
        success: true
      })
    : res.send(400).json({ message: result })
}

export const subtractLimitClientController = async (
  req: Request,
  res: Response
) => {
  const userRole = (req.user as User).role
  const userCode = (req.user as User).code
  const limitType = req.body.limitType

  const result = await handleLimitOperation(req, LIMIT_OPERATION.Subtract)
  if (limitType === 'CASH') {
    await denaHandler(
      {
        amount: req.body.limit,
        recipient: req.body.childCode,
        description: `Limit minus by ${userRole}`,
        userCode
      },
      'Payment Paid'
    )
  }
  return result === true
    ? res.json({
        success: true
      })
    : res.send(400).json({ message: result })
}
