import { Router } from 'express'

import { loginAgentController } from '../controllers/agent/auth.controller'
import { logoutClientController } from '../controllers/client/auth.controller'
import { clientPassport } from '../passport/client.passport'

const router = Router()

//auth
router.post(
  '/login',
  clientPassport.authenticate('local'),
  loginAgentController
)
router.get('/logout', logoutClientController)

//create

export default router
