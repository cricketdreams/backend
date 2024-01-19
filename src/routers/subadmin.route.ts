import { Router } from 'express'

import {
  createAgentController,
  createClientController,
  createMasterController,
  createSuperagentController
} from '../controllers/create.controller'
import {
  loginSubadminController,
  logoutSubadminController
} from '../controllers/subadmin/auth.controller'
import { isAuthenticate } from '../middlewares/check-auth'
import {} from '../passport/admin.passport'
import { subadminPassport } from '../passport/subadmin.passport'
import { catchError } from '../middlewares/catch-error'
import {
  addLimitAgentController,
  addLimitClientController,
  addLimitMasterController,
  addLimitSuperagentController,
  subtractLimitMasterController,
  subtractLimitSuperagentController,
  subtractLimitAgentController,
  subtractLimitClientController
} from '../controllers/subadmin/limit.controller'
import {
  agentLoginReportController,
  clientLoginReportController,
  masterLoginReportController,
  superagentLoginReportController
} from '../controllers/login-report.controller'
import {
  getAllAgentController,
  getAllClientController,
  getAllMasterController,
  getAllSuperagentController
} from '../controllers/get-all-users.controller'

const router = Router()

//auth
router.post(
  '/login',
  subadminPassport.authenticate('local'),
  catchError(loginSubadminController)
)
router.get('/logout', catchError(logoutSubadminController))

//create
router.post(
  '/create-master',
  isAuthenticate,
  catchError(createMasterController)
)
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
  '/add-limit-master',
  isAuthenticate,
  catchError(addLimitMasterController)
)
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
  '/subtract-limit-master',
  isAuthenticate,
  catchError(subtractLimitMasterController)
)
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
  '/login-report-master',
  isAuthenticate,
  catchError(masterLoginReportController)
)
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
router.get('/all-master', isAuthenticate, catchError(getAllMasterController))
router.get(
  '/all-superagent',
  isAuthenticate,
  catchError(getAllSuperagentController)
)
router.get('/all-agent', isAuthenticate, catchError(getAllAgentController))
router.get('/all-client', isAuthenticate, catchError(getAllClientController))

export default router
