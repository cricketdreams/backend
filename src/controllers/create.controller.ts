import { Request, Response } from 'express'

import {
  createAgentHandler,
  createClientHandler,
  createMasterHandler,
  createSubadminHandler,
  createSuperagentHandler
} from '../handlers/create-user.handler'

export const createSubadminController = async (req: Request, res: Response) => {
  return await createSubadminHandler(req, res)
}

export const createMasterController = async (req: Request, res: Response) => {
  return await createMasterHandler(req, res)
}

export const createSuperagentController = async (
  req: Request,
  res: Response
) => {
  return await createSuperagentHandler(req, res)
}

export const createAgentController = async (req: Request, res: Response) => {
  return await createAgentHandler(req, res)
}

export const createClientController = async (req: Request, res: Response) => {
  return await createClientHandler(req, res)
}
