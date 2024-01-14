import { Request, Response } from 'express'

export const deactiveSubadminController = async (
  req: Request,
  res: Response
) => {
  return await deactiveSubadminHandler(req, res)
}

export const deactiveMasterController = async (req: Request, res: Response) => {
  return await deactiveMasterHandler(req, res)
}

export const deactiveSuperagentController = async (
  req: Request,
  res: Response
) => {
  return await deactiveSuperagentHandler(req, res)
}

export const deactiveAgentController = async (req: Request, res: Response) => {
  return await deactiveAgentHandler(req, res)
}

export const deactiveClientController = async (req: Request, res: Response) => {
  return await deactiveClientHandler(req, res)
}
