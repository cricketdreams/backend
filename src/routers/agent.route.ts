import { Router } from 'express'

import { createClientController } from '../controllers/create.controller'
import {
  loginAgentController,
  logoutAgentController
} from '../controllers/agent/auth.controller'
import { isAuthenticate } from '../middlewares/check-auth'
import { agentPassport } from '../passport/agent.passport'
import { catchError } from '../middlewares/catch-error'
import {
  addLimitClientController,
  subtractLimitClientController
} from '../controllers/agent/limit.controller'
import { clientLoginReportController } from '../controllers/login-report.controller'
import { getAllClientController } from '../controllers/get-all-users.controller'

const router = Router()

//auth
router.post(
  '/login',
  agentPassport.authenticate('local'),
  catchError(loginAgentController)
)
router.get('/logout', catchError(logoutAgentController))

//create
router.post(
  '/create-client',
  isAuthenticate,
  catchError(createClientController)
)

// limit
// add limit
router.post(
  '/add-limit-client',
  isAuthenticate,
  catchError(addLimitClientController)
)

// subtract limit
router.post(
  '/subtract-limit-client',
  isAuthenticate,
  catchError(subtractLimitClientController)
)

// login report
router.post(
  '/login-report-client',
  isAuthenticate,
  catchError(clientLoginReportController)
)

// get all users
router.get('/all-client', isAuthenticate, catchError(getAllClientController))

export default router
