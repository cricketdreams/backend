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
import {
  addLimitAgentController,
  addLimitClientController,
  addLimitSuperagentController,
  subtractLimitSuperagentController,
  subtractLimitAgentController,
  subtractLimitClientController
} from '../controllers/master/limit.controller'

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

// limit
// add limit
router.post(
  '/add-limit-superagent',
  isAuthenticate,
  addLimitSuperagentController
)
router.post('/add-limit-agent', isAuthenticate, addLimitAgentController)
router.post('/add-limit-client', isAuthenticate, addLimitClientController)

// subtract limit
router.post(
  '/subtract-limit-superagent',
  isAuthenticate,
  subtractLimitSuperagentController
)
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
