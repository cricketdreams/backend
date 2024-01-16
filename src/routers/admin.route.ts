import { Router } from 'express'

import {
  addLimitAgentController,
  addLimitClientController,
  addLimitMasterController,
  addLimitSubadminController,
  addLimitSuperagentController,
  subtractLimitAgentController,
  subtractLimitClientController,
  subtractLimitMasterController,
  subtractLimitSubadminController,
  subtractLimitSuperagentController
} from '../controllers/admin/limit.controller'
import {
  createAdminController,
  loginAdminController,
  logoutAdminController
} from '../controllers/admin/auth.controller'
import {
  createAgentController,
  createClientController,
  createMasterController,
  createSubadminController,
  createSuperagentController
} from '../controllers/create.controller'
import { isAuthenticate } from '../middlewares/check-auth'
import { adminPassport } from '../passport/admin.passport'
import { catchError } from '../middlewares/catch-error'
import { adminLoginReportController, agentLoginReportController, clientLoginReportController, masterLoginReportController, subadminLoginReportController, superagentLoginReportController } from '../controllers/login-report.controller'

const router = Router()

//auth
// only for development
router.post('/create-admin', catchError(createAdminController))
router.post(
  '/login',
  adminPassport.authenticate('local'),
  catchError(loginAdminController)
)
router.get('/logout', catchError(logoutAdminController))

//create
router.post(
  '/create-subadmin',
  isAuthenticate,
  catchError(createSubadminController)
)
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

// active deactivate

router.post(
  '/active-subadmin',
  isAuthenticate,
  catchError(createSubadminController)
)
router.post(
  '/active-master',
  isAuthenticate,
  catchError(createMasterController)
)
router.post(
  '/active-superagent',
  isAuthenticate,
  catchError(createSuperagentController)
)
router.post('/active-agent', isAuthenticate, catchError(createAgentController))
router.post(
  '/active-client',
  isAuthenticate,
  catchError(createClientController)
)

// limit
// add limit
router.post('/add-limit-subadmin', isAuthenticate, catchError(addLimitSubadminController))
router.post('/add-limit-master', isAuthenticate, catchError(addLimitMasterController))
router.post(
  '/add-limit-superagent',
  isAuthenticate,
  catchError(addLimitSuperagentController)
)
router.post('/add-limit-agent', isAuthenticate, catchError(addLimitAgentController))
router.post('/add-limit-client', isAuthenticate,catchError(addLimitClientController))

// subtract limit
router.post(
  '/subtract-limit-subadmin',
  isAuthenticate,
  catchError(subtractLimitSubadminController
))
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
router.post('/login-report', isAuthenticate, catchError(adminLoginReportController))
router.post('/login-report-subadmin', isAuthenticate, catchError(subadminLoginReportController))
router.post('/login-report-master', isAuthenticate, catchError(masterLoginReportController))
router.post('/login-report-superagent', isAuthenticate, catchError(superagentLoginReportController))
router.post('/login-report-agent', isAuthenticate, catchError(agentLoginReportController))
router.post('/login-report-client', isAuthenticate, catchError(clientLoginReportController))

export default router
