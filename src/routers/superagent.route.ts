import { Router } from 'express'

import {
  createAgentController,
  createClientController
} from '../controllers/create.controller'

import { currentUserController } from '../controllers/current-user.controller'
import {
  getAllAgentLedgerController,
  getAllClientLedgerController
} from '../controllers/get-all-ledger.controller'
import {
  getAllAgentController,
  getAllClientController
} from '../controllers/get-all-users.controller'
import { getUserController } from '../controllers/get-user.controller'
import { ledgerController } from '../controllers/ledger.controller'
import {
  addLimitAgentController,
  addLimitClientController,
  subtractLimitAgentController,
  subtractLimitClientController
} from '../controllers/limit.controller'
import {
  agentLoginReportController,
  clientLoginReportController
} from '../controllers/login-report.controller'
import {
  agentReportController,
  clientReportController
} from '../controllers/report.controller'
import {
  activeAgentController,
  activeClientController,
  deactiveAgentController,
  deactiveClientController
} from '../controllers/status.controller'
import {
  loginSuperagentController,
  logoutSuperagentController
} from '../controllers/superagent/auth.controller'
import {
  updateAgentController,
  updateClientController
} from '../controllers/superagent/update.controller'
import {
  denaTransactionController,
  lenaTransactionController
} from '../controllers/transaction.controller'
import { updatePasswordController } from '../controllers/update-password.controller'
import { catchError } from '../middlewares/catch-error'
import { isAuthenticated } from '../middlewares/check-auth'
import { masterPassport } from '../passport/master.passport'

const router = Router()

//auth
router.post(
  '/login',
  masterPassport.authenticate('local'),
  catchError(loginSuperagentController)
)
router.get('/logout', catchError(logoutSuperagentController))
router.get('/current-user', isAuthenticated, catchError(currentUserController))

//create
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
router.post('/report-agent', isAuthenticated, catchError(agentReportController))
router.post(
  '/report-client',
  isAuthenticated,
  catchError(clientReportController)
)

// get all users
router.post('/all-agent', isAuthenticated, catchError(getAllAgentController))
router.post('/all-client', isAuthenticated, catchError(getAllClientController))

// status
// active
router.post('/active-agent', isAuthenticated, catchError(activeAgentController))
router.post(
  '/active-client',
  isAuthenticated,
  catchError(activeClientController)
)

// deactive
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

//update
router.post('/update-agent', isAuthenticated, catchError(updateAgentController))
router.post(
  '/update-client',
  isAuthenticated,
  catchError(updateClientController)
)

// get all user ledger
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
