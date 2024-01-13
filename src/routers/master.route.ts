import { Router } from 'express'
import {
  createAgentController,
  createClientController,
  createSuperagentController
} from '../controllers/create.controller'

import {
  loginMasterController,
  logoutMasterController
} from '../controllers/master/auth.controller'
import { isAuthenticate } from '../middlewares/check-auth'
import { masterPassport } from '../passport/master.passport'

const router = Router()

//auth
router.post(
  '/login',
  masterPassport.authenticate('local'),
  loginMasterController
)
router.get('/logout', logoutMasterController)

//create
router.post('/create-superagent', isAuthenticate, createSuperagentController)
router.post('/create-agent', isAuthenticate, createAgentController)
router.post('/create-client', isAuthenticate, createClientController)

export default router
