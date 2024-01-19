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
import { isAuthenticated } from '../middlewares/check-auth'
import { adminPassport } from '../passport/admin.passport'
import { catchError } from '../middlewares/catch-error'
import {
  adminLoginReportController,
  agentLoginReportController,
  clientLoginReportController,
  masterLoginReportController,
  subadminLoginReportController,
  superagentLoginReportController
} from '../controllers/login-report.controller'
import {
  getAllAgentController,
  getAllClientController,
  getAllMasterController,
  getAllSubadminController,
  getAllSuperagentController
} from '../controllers/get-all-users.controller'

const router = Router()

router.post('/create-admin', catchError(createAdminController)) // only for development

//auth
router.post(
  '/login',
  adminPassport.authenticate('local'),
  catchError(loginAdminController)
)
router.get('/logout', catchError(logoutAdminController))

//create
router.post(
  '/create-subadmin',
  isAuthenticated,
  catchError(createSubadminController)
)
router.post(
  '/create-master',
  isAuthenticated,
  catchError(createMasterController)
)
router.post(
  '/create-superagent',
  isAuthenticated,
  catchError(createSuperagentController)
)
router.post('/create-agent', isAuthenticated, catchError(createAgentController))
router.post(
  '/create-client',
  isAuthenticated,
  catchError(createClientController)
)

// active deactivate
router.post(
  '/active-subadmin',
  isAuthenticated,
  catchError(createSubadminController)
)
router.post(
  '/active-master',
  isAuthenticated,
  catchError(createMasterController)
)
router.post(
  '/active-superagent',
  isAuthenticated,
  catchError(createSuperagentController)
)
router.post('/active-agent', isAuthenticated, catchError(createAgentController))
router.post(
  '/active-client',
  isAuthenticated,
  catchError(createClientController)
)

// limit
// add limit
router.post(
  '/add-limit-subadmin',
  isAuthenticated,
  catchError(addLimitSubadminController)
)
router.post(
  '/add-limit-master',
  isAuthenticated,
  catchError(addLimitMasterController)
)
router.post(
  '/add-limit-superagent',
  isAuthenticated,
  catchError(addLimitSuperagentController)
)
router.post(
  '/add-limit-agent',
  isAuthenticated,
  catchError(addLimitAgentController)
)
router.post(
  '/add-limit-client',
  isAuthenticated,
  catchError(addLimitClientController)
)

// subtract limit
router.post(
  '/subtract-limit-subadmin',
  isAuthenticated,
  catchError(subtractLimitSubadminController)
)
router.post(
  '/subtract-limit-master',
  isAuthenticated,
  catchError(subtractLimitMasterController)
)
router.post(
  '/subtract-limit-superagent',
  isAuthenticated,
  catchError(subtractLimitSuperagentController)
)
router.post(
  '/subtract-limit-agent',
  isAuthenticated,
  catchError(subtractLimitAgentController)
)
router.post(
  '/subtract-limit-client',
  isAuthenticated,
  catchError(subtractLimitClientController)
)

// login report
router.post(
  '/login-report',
  isAuthenticated,
  catchError(adminLoginReportController)
)
router.post(
  '/login-report-subadmin',
  isAuthenticated,
  catchError(subadminLoginReportController)
)
router.post(
  '/login-report-master',
  isAuthenticated,
  catchError(masterLoginReportController)
)
router.post(
  '/login-report-superagent',
  isAuthenticated,
  catchError(superagentLoginReportController)
)
router.post(
  '/login-report-agent',
  isAuthenticated,
  catchError(agentLoginReportController)
)
router.post(
  '/login-report-client',
  isAuthenticated,
  catchError(clientLoginReportController)
)

// get all users
router.get(
  '/all-subadmin',
  isAuthenticated,
  catchError(getAllSubadminController)
)
router.get('/all-master', isAuthenticated, catchError(getAllMasterController))
router.get(
  '/all-superagent',
  isAuthenticated,
  catchError(getAllSuperagentController)
)
router.get('/all-agent', isAuthenticated, catchError(getAllAgentController))
router.get('/all-client', isAuthenticated, catchError(getAllClientController))

export default router
