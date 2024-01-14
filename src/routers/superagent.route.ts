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
import { catchError } from '../middlewares/catch-error'

const router = Router()

//auth
router.post(
  '/login',
  masterPassport.authenticate('local'),
  catchError(loginSuperagentController)
)
router.get('/logout', catchError(logoutSuperagentController))

//create
router.post('/create-agent', isAuthenticate, catchError(createAgentController))
router.post(
  '/create-client',
  isAuthenticate,
  catchError(createClientController)
)

export default router
