import { Request, Response } from 'express'

import { createUser } from '.'
import { User } from '../../ts/enum'

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
