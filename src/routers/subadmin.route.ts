import { Router } from 'express'

import {
  createAgentController,
  createClientController,
  createMasterController,
  createSuperagentController
} from '../controllers/create.controller'
import { currentUserController } from '../controllers/current-user.controller'
import {
  getAllAgentLedgerController,
  getAllClientLedgerController,
  getAllMasterLedgerController,
  getAllSuperagentLedgerController
} from '../controllers/get-all-ledger.controller'
import {
  getAllAgentController,
  getAllClientController,
  getAllMasterController,
  getAllSuperagentController
} from '../controllers/get-all-users.controller'
import { getUserController } from '../controllers/get-user.controller'
import { ledgerController } from '../controllers/ledger.controller'
import {
  addLimitAgentController,
  addLimitClientController,
  addLimitMasterController,
  addLimitSuperagentController,
  subtractLimitAgentController,
  subtractLimitClientController,
  subtractLimitMasterController,
  subtractLimitSuperagentController
} from '../controllers/limit.controller'
import {
  agentLoginReportController,
  clientLoginReportController,
  masterLoginReportController,
  superagentLoginReportController
} from '../controllers/login-report.controller'
import {
  agentReportController,
  clientReportController,
  masterReportController,
  superagentReportController
} from '../controllers/report.controller'
import {
  activeAgentController,
  activeClientController,
  activeMasterController,
  activeSuperagentController,
  deactiveAgentController,
  deactiveClientController,
  deactiveMasterController,
  deactiveSuperagentController
} from '../controllers/status.controller'
import {
  loginSubadminController,
  logoutSubadminController
} from '../controllers/subadmin/auth.controller'
import {
  updateAgentController,
  updateClientController,
  updateMasterController,
  updateSuperagentController
} from '../controllers/subadmin/update.controller'
import {
  denaTransactionController,
  lenaTransactionController
} from '../controllers/transaction.controller'
import { updatePasswordController } from '../controllers/update-password.controller'
import { catchError } from '../middlewares/catch-error'
import { isAuthenticated } from '../middlewares/check-auth'
import {} from '../passport/admin.passport'
import { subadminPassport } from '../passport/subadmin.passport'

const router = Router()

//auth
router.post(
  '/login',
  subadminPassport.authenticate('local'),
  catchError(loginSubadminController)
)
router.get('/logout', catchError(logoutSubadminController))
router.get('/current-user', isAuthenticated, catchError(currentUserController))

//create
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

// update password
router.post(
  '/update-password',
  isAuthenticated,
  catchError(updatePasswordController)
)

// limit
// add limit
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
router.post('/all-master', isAuthenticated, catchError(getAllMasterController))
router.post(
  '/all-superagent',
  isAuthenticated,
  catchError(getAllSuperagentController)
)
router.post('/all-agent', isAuthenticated, catchError(getAllAgentController))
router.post('/all-client', isAuthenticated, catchError(getAllClientController))

// status
// active
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

// get all user ledger
router.get(
  '/all-master-ledger',
  isAuthenticated,
  catchError(getAllMasterLedgerController)
)
router.get(
  '/all-superagent-ledger',
  isAuthenticated,
  catchError(getAllSuperagentLedgerController)
)
router.get(
  '/all-agent-ledger',
  isAuthenticated,
  catchError(getAllAgentLedgerController)
)
router.get(
  '/all-client-ledger',
  isAuthenticated,
  catchError(getAllClientLedgerController)
)

router.post('/get-child', isAuthenticated, catchError(getUserController))

export default router
