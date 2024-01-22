import { Request, Response } from 'express'

import { handleLimitOperation } from '../handlers/limit.handler'
import { LIMIT_OPERATION, ROLES } from '../ts/type'
import { prisma } from '../prisma/prisma'
import { getUserHandler } from '../handlers/user/get-user.handler'

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
  const result = await handleLimitOperation(req, LIMIT_OPERATION.Add)
  return result === true
    ? res.status(200).end()
    : res.send(400).json({ message: result })
}

export const subtractLimitMasterController = async (
  req: Request,
  res: Response
) => {
  const result = await handleLimitOperation(req, LIMIT_OPERATION.Subtract)
  return result === true
    ? res.status(200).end()
    : res.send(400).json({ message: result })
}

// Super Agent Limit
export const addLimitSuperagentController = async (
  req: Request,
  res: Response
) => {
  const result = await handleLimitOperation(req, LIMIT_OPERATION.Add)
  return result === true
    ? res.status(200).end()
    : res.send(400).json({ message: result })
}

export const subtractLimitSuperagentController = async (
  req: Request,
  res: Response
) => {
  const result = await handleLimitOperation(req, LIMIT_OPERATION.Subtract)
  return result === true
    ? res.status(200).end()
    : res.send(400).json({ message: result })
}

// Agent Limit
export const addLimitAgentController = async (req: Request, res: Response) => {
  const result = await handleLimitOperation(req, LIMIT_OPERATION.Add)
  return result === true
    ? res.status(200).end()
    : res.send(400).json({ message: result })
}

export const subtractLimitAgentController = async (
  req: Request,
  res: Response
) => {
  const result = await handleLimitOperation(req, LIMIT_OPERATION.Subtract)
  return result === true
    ? res.status(200).end()
    : res.send(400).json({ message: result })
}

// Client Limit
export const addLimitClientController = async (req: Request, res: Response) => {
  const result = await handleLimitOperation(req, LIMIT_OPERATION.Add)
  return result === true
    ? res.status(200).end()
    : res.send(400).json({ message: result })
}

export const subtractLimitClientController = async (
  req: Request,
  res: Response
) => {
  const result = await handleLimitOperation(req, LIMIT_OPERATION.Subtract)
  return result === true
    ? res.status(200).end()
    : res.send(400).json({ message: result })
}
