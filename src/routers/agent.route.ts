import { Router } from 'express'
import { createClientController } from '../controllers/create.controller'

import {
  loginAgentController,
  logoutAgentController
} from '../controllers/agent/auth.controller'
import { isAuthenticate } from '../middlewares/check-auth'
import { agentPassport } from '../passport/agent.passport'

const router = Router()

//auth
router.post('/login', agentPassport.authenticate('local'), loginAgentController)
router.get('/logout', logoutAgentController)

//create
router.post('/create-client', isAuthenticate, createClientController)

export default router
