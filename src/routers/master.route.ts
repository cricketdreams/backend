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
import { catchError } from '../middlewares/catch-error'

const router = Router()

//auth
router.post(
  '/login',
  masterPassport.authenticate('local'),
  catchError(loginMasterController)
)
router.get('/logout', catchError(logoutMasterController))

//create
router.post(
  '/create-superagent',
  isAuthenticate,
  catchError(createSuperagentController)
)
router.post('/create-agent', isAuthenticate, catchError(createAgentController))
router.post(
  '/create-client',
  isAuthenticate,
  catchError(createClientController)
)

export default router
