import { Request, Response } from 'express'

import { createUser } from '.'

export const createSubadminHandler = async (req: Request, res: Response) => {
  try {
    const data = req.body

    const response = await createUser(data, 'admin', 'subadmin')
    res.status(201).json(response)
  } catch (error) {
    throw error
  }
}

export const createMasterHandler = async (req: Request, res: Response) => {
  try {
    const data = req.body

    const response = await createUser(data, 'subadmin', 'master')
    res.status(201).json(response)
  } catch (error) {
    throw error
  }
}

export const createSuperagentHandler = async (req: Request, res: Response) => {
  try {
    const data = req.body

    const response = await createUser(data, 'master', 'superagent')
    res.status(201).json(response)
  } catch (error) {
    throw error
  }
}

export const createAgentHandler = async (req: Request, res: Response) => {
  try {
    const data = req.body

    const response = await createUser(data, 'superagent', 'agent')
    res.status(201).json(response)
  } catch (error) {
    throw error
  }
}

export const createClientHandler = async (req: Request, res: Response) => {
  try {
    const data = req.body

    const response = await createUser(data, 'agent', 'client')
    res.status(201).json(response)
  } catch (error) {
    throw error
  }
}
