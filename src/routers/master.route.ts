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
import { isAuthenticated } from '../middlewares/check-auth'
import { masterPassport } from '../passport/master.passport'
import { catchError } from '../middlewares/catch-error'
import {
  addLimitAgentController,
  addLimitClientController,
  addLimitSuperagentController,
  subtractLimitSuperagentController,
  subtractLimitAgentController,
  subtractLimitClientController
} from '../controllers/limit.controller'
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
import {
  activeSuperagentController,
  activeAgentController,
  activeClientController,
  deactiveSuperagentController,
  deactiveAgentController,
  deactiveClientController
} from '../controllers/status.controller'
import { updatePasswordController } from '../controllers/update-password.controller'
import {
  denaTransactionController,
  lenaTransactionController
} from '../controllers/transaction.controller'
import {
  updateAgentController,
  updateClientController,
  updateSuperagentController
} from '../controllers/master/update.controller'
import { ledgerController } from '../controllers/ledger.controller'
import {
  agentReportController,
  clientReportController,
  superagentReportController
} from '../controllers/report.controller'
import {
  getAllSuperagentLedgerController,
  getAllAgentLedgerController,
  getAllClientLedgerController
} from '../controllers/get-all-ledger.controller'
import { currentUserController } from '../controllers/current-user.controller'
import { getUserController } from '../controllers/getUser.controller'

const router = Router()

//auth
router.post(
  '/login',
  masterPassport.authenticate('local'),
  catchError(loginMasterController)
)
router.get('/logout', catchError(logoutMasterController))
router.get('/current-user', isAuthenticated, catchError(currentUserController))

//create
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
router.post(
  '/all-superagent-ledger',
  isAuthenticated,
  catchError(getAllSuperagentLedgerController)
)
router.post(
  '/all-agent-ledger',
  isAuthenticated,
  catchError(getAllAgentLedgerController)
)
router.post(
  '/all-client-ledger',
  isAuthenticated,
  catchError(getAllClientLedgerController)
)

router.post('/get-child', isAuthenticated, catchError(getUserController))

export default router
