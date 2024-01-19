import { Request, Response } from 'express'

import { activeHandler, deactiveHandler } from '../handlers/status.handler'
import { ROLES } from '../ts/type'

const createController = (handler: Function, role: string) => {
  return async (req: Request, res: Response) => {
    await handler(req, role)
    return res.status(200).json({ success: true })
  }
}

// active controllers
export const activeSubadminController = createController(
  activeHandler,
  ROLES.Subadmin
)
export const activeMasterController = createController(
  activeHandler,
  ROLES.Master
)
export const activeSuperagentController = createController(
  activeHandler,
  ROLES.Superagent
)
export const activeAgentController = createController(
  activeHandler,
  ROLES.Agent
)
export const activeClientController = createController(
  activeHandler,
  ROLES.Client
)

// deactive controllers
export const deactiveSubadminController = createController(
  deactiveHandler,
  ROLES.Subadmin
)
export const deactiveMasterController = createController(
  deactiveHandler,
  ROLES.Master
)
export const deactiveSuperagentController = createController(
  deactiveHandler,
  ROLES.Superagent
)
export const deactiveAgentController = createController(
  deactiveHandler,
  ROLES.Agent
)
export const deactiveClientController = createController(
  deactiveHandler,
  ROLES.Client
)
