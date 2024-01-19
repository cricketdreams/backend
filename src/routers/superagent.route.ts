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
import {
  agentLoginReportController,
  clientLoginReportController
} from '../controllers/login-report.controller'
import {
  getAllAgentController,
  getAllClientController
} from '../controllers/get-all-users.controller'

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
router.post(
  '/add-limit-agent',
  isAuthenticate,
  catchError(addLimitAgentController)
)
router.post(
  '/add-limit-client',
  isAuthenticate,
  catchError(addLimitClientController)
)

// subtract limit
router.post(
  '/subtract-limit-agent',
  isAuthenticate,
  catchError(subtractLimitAgentController)
)
router.post(
  '/subtract-limit-client',
  isAuthenticate,
  catchError(subtractLimitClientController)
)

// login report
router.post(
  '/login-report-agent',
  isAuthenticate,
  catchError(agentLoginReportController)
)
router.post(
  '/login-report-client',
  isAuthenticate,
  catchError(clientLoginReportController)
)

// get all users
router.get('/all-agent', isAuthenticate, catchError(getAllAgentController))
router.get('/all-client', isAuthenticate, catchError(getAllClientController))

export default router
