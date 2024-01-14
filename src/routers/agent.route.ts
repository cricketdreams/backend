import { Router } from 'express'

import { createClientController } from '../controllers/create.controller'
import {
  loginAgentController,
  logoutAgentController
} from '../controllers/agent/auth.controller'
import { isAuthenticate } from '../middlewares/check-auth'
import { agentPassport } from '../passport/agent.passport'
import { catchError } from '../middlewares/catch-error'

const router = Router()

//auth
router.post('/login', agentPassport.authenticate('local'), catchError(loginAgentController))
router.get('/logout', catchError(logoutAgentController))

//create
router.post(
  '/create-client',
  isAuthenticate,
  catchError(createClientController)
)

export default router
