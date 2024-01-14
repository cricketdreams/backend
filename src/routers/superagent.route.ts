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
import {
  addLimitAgentController,
  addLimitClientController,
  subtractLimitAgentController,
  subtractLimitClientController
} from '../controllers/superagent/limit.controller'

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

// limit
// add limit
router.post('/add-limit-agent', isAuthenticate, addLimitAgentController)
router.post('/add-limit-client', isAuthenticate, addLimitClientController)

// subtract limit
router.post(
  '/subtract-limit-agent',
  isAuthenticate,
  subtractLimitAgentController
)
router.post(
  '/subtract-limit-client',
  isAuthenticate,
  subtractLimitClientController
)

export default router
