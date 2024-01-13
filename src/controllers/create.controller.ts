import { Request, Response } from 'express'
import {
  createAgentHandler,
  createClientHandler,
  createMasterHandler,
  createSubadminHandler,
  createSuperagentHandler
} from '../handlers/create-user/create.handler'

export const createSubadminController = async (req: Request, res: Response) => {
  try {
    return await createSubadminHandler(req, res)
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({
        message: error.message
      })
  }
}

export const createMasterController = async (req: Request, res: Response) => {
  try {
    return await createMasterHandler(req, res)
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({
        message: error.message
      })
  }
}

export const createSuperagentController = async (
  req: Request,
  res: Response
) => {
  try {
    return await createSuperagentHandler(req, res)
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({
        message: error.message
      })
  }
}

export const createAgentController = async (req: Request, res: Response) => {
  try {
    return await createAgentHandler(req, res)
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({
        message: error.message
      })
  }
}

export const createClientController = async (req: Request, res: Response) => {
  try {
    return await createClientHandler(req, res)
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({
        message: error.message
      })
  }
}
