import { Router } from 'express'

import {
  createAdminController,
  loginAdminController,
  logoutAdminController
} from '../controllers/admin/auth.controller'
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
} from '../controllers/limit.controller'
import {
  createAgentController,
  createClientController,
  createMasterController,
  createSubadminController,
  createSuperagentController
} from '../controllers/create.controller'
import {
  getAllAgentController,
  getAllClientController,
  getAllMasterController,
  getAllSubadminController,
  getAllSuperagentController
} from '../controllers/get-all-users.controller'
import {
  adminLoginReportController,
  agentLoginReportController,
  clientLoginReportController,
  masterLoginReportController,
  subadminLoginReportController,
  superagentLoginReportController
} from '../controllers/login-report.controller'
import {
  activeAgentController,
  activeClientController,
  activeMasterController,
  activeSubadminController,
  activeSuperagentController,
  deactiveAgentController,
  deactiveClientController,
  deactiveMasterController,
  deactiveSubadminController,
  deactiveSuperagentController
} from '../controllers/status.controller'
import {
  denaTransactionController,
  lenaTransactionController
} from '../controllers/transaction.controller'
import { updatePasswordController } from '../controllers/update-password.controller'
import { catchError } from '../middlewares/catch-error'
import { isAuthenticated } from '../middlewares/check-auth'
import { adminPassport } from '../passport/admin.passport'
import {
  updateAgentController,
  updateClientController,
  updateMasterController,
  updateSubadminController,
  updateSuperagentController
} from '../controllers/admin/update.controller'
import { ledgerController } from '../controllers/ledger.controller'
import {
  adminReportController,
  agentReportController,
  clientReportController,
  masterReportController,
  subadminReportController,
  superagentReportController
} from '../controllers/report.controller'

const router = Router()

router.post('/create-admin', catchError(createAdminController)) // only for development

//auth
router.post(
  '/login',
  adminPassport.authenticate('local'),
  catchError(loginAdminController)
)
router.get('/logout', catchError(logoutAdminController))

// update password
router.post(
  '/update-password',
  isAuthenticated,
  catchError(updatePasswordController)
)

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

// report
router.post('/report', isAuthenticated, catchError(adminReportController))
router.post(
  '/report-subadmin',
  isAuthenticated,
  catchError(subadminReportController)
)
router.post(
  '/report-master',
  isAuthenticated,
  catchError(masterReportController)
)
router.post(
  '/report-superagent',
  isAuthenticated,
  catchError(superagentReportController)
)
router.post('/report-agent', isAuthenticated, catchError(agentReportController))
router.post(
  '/report-client',
  isAuthenticated,
  catchError(clientReportController)
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

// status
// active
router.post(
  '/active-subadmin',
  isAuthenticated,
  catchError(activeSubadminController)
)
router.post(
  '/active-master',
  isAuthenticated,
  catchError(activeMasterController)
)
router.post(
  '/active-superagent',
  isAuthenticated,
  catchError(activeSuperagentController)
)
router.post('/active-agent', isAuthenticated, catchError(activeAgentController))
router.post(
  '/active-client',
  isAuthenticated,
  catchError(activeClientController)
)

// deactive
router.post(
  '/deactive-subadmin',
  isAuthenticated,
  catchError(deactiveSubadminController)
)
router.post(
  '/deactive-master',
  isAuthenticated,
  catchError(deactiveMasterController)
)
router.post(
  '/deactive-superagent',
  isAuthenticated,
  catchError(deactiveSuperagentController)
)
router.post(
  '/deactive-agent',
  isAuthenticated,
  catchError(deactiveAgentController)
)
router.post(
  '/deactive-client',
  isAuthenticated,
  catchError(deactiveClientController)
)

// transaction
router.post(
  '/transaction/dena',
  isAuthenticated,
  catchError(denaTransactionController)
)

router.post(
  '/transaction/lena',
  isAuthenticated,
  catchError(lenaTransactionController)
)

router.post('/ledger', isAuthenticated, catchError(ledgerController))

// update
router.post(
  '/update-subadmin',
  isAuthenticated,
  catchError(updateSubadminController)
)
router.post(
  '/update-master',
  isAuthenticated,
  catchError(updateMasterController)
)
router.post(
  '/update-superagent',
  isAuthenticated,
  catchError(updateSuperagentController)
)

router.post('/update-agent', isAuthenticated, catchError(updateAgentController))
router.post(
  '/update-client',
  isAuthenticated,
  catchError(updateClientController)
)

export default router
