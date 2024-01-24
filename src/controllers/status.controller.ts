import { Request, Response } from 'express'

import { activeHandler, deactiveHandler } from '../handlers/status.handler'
import { ROLES } from '../ts/type'

const CreateController = (handler: Function, role: string) => {
  return async (req: Request, res: Response) => {
    await handler(req, role)
    return res.json({ success: true })
  }
}

// active controllers
export const activeSubadminController = CreateController(
  activeHandler,
  ROLES.Subadmin
)
export const activeMasterController = CreateController(
  activeHandler,
  ROLES.Master
)
export const activeSuperagentController = CreateController(
  activeHandler,
  ROLES.Superagent
)
export const activeAgentController = CreateController(
  activeHandler,
  ROLES.Agent
)
export const activeClientController = CreateController(
  activeHandler,
  ROLES.Client
)

// deactive controllers
export const deactiveSubadminController = CreateController(
  deactiveHandler,
  ROLES.Subadmin
)
export const deactiveMasterController = CreateController(
  deactiveHandler,
  ROLES.Master
)
export const deactiveSuperagentController = CreateController(
  deactiveHandler,
  ROLES.Superagent
)
export const deactiveAgentController = CreateController(
  deactiveHandler,
  ROLES.Agent
)
export const deactiveClientController = CreateController(
  deactiveHandler,
  ROLES.Client
)
