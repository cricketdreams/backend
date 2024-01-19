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
import {
  agentLoginReportController,
  clientLoginReportController,
  superagentLoginReportController
} from '../controllers/login-report.controller'
import {
  getAllAgentController,
  getAllClientController,
  getAllSuperagentController
} from '../controllers/get-all-users.controller'

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
  catchError(addLimitSuperagentController)
)
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
  '/subtract-limit-superagent',
  isAuthenticate,
  catchError(subtractLimitSuperagentController)
)
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
  '/login-report-superagent',
  isAuthenticate,
  catchError(superagentLoginReportController)
)
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
router.get(
  '/all-superagent',
  isAuthenticate,
  catchError(getAllSuperagentController)
)
router.get('/all-agent', isAuthenticate, catchError(getAllAgentController))
router.get('/all-client', isAuthenticate, catchError(getAllClientController))

export default router
