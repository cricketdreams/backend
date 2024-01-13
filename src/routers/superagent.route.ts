import { Router } from 'express'
import {
  createAgentController,
  createClientController
} from '../controllers/create.controller'

import {
  loginSuperagentController,
  logoutSuperagentController
} from '../controllers/superagent/auth.controller'
import { isAuthenticate } from '../middlewares/check-auth'
import { masterPassport } from '../passport/master.passport'

const router = Router()

//auth
router.post(
  '/login',
  masterPassport.authenticate('local'),
  loginSuperagentController
)
router.get('/logout', logoutSuperagentController)

//create
router.post('/create-agent', isAuthenticate, createAgentController)
router.post('/create-client', isAuthenticate, createClientController)

export default router
