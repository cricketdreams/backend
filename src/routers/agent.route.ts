import { Router } from 'express'

import { createClientController } from '../controllers/create.controller'
import {
  loginAgentController,
  logoutAgentController
} from '../controllers/agent/auth.controller'
import { isAuthenticated } from '../middlewares/check-auth'
import { agentPassport } from '../passport/agent.passport'
import { catchError } from '../middlewares/catch-error'
import {
  addLimitClientController,
  subtractLimitClientController
} from '../controllers/limit.controller'
import { clientLoginReportController } from '../controllers/login-report.controller'
import { getAllClientController } from '../controllers/get-all-users.controller'
import {
  activeClientController,
  deactiveClientController
} from '../controllers/status.controller'
import { updatePasswordController } from '../controllers/update-password.controller'
import {
  denaTransactionController,
  lenaTransactionController
} from '../controllers/transaction.controller'
import { updateClientController } from '../controllers/agent/update.controller'
import { ledgerController } from '../controllers/ledger.controller'
import { clientReportController } from '../controllers/report.controller'
import { getAllClientLedgerController } from '../controllers/get-all-ledger.controller'
import { currentUserController } from '../controllers/current-user.controller'
import { getUserController } from '../controllers/getUser.controller'

const router = Router()

//auth
router.post(
  '/login',
  agentPassport.authenticate('local'),
  catchError(loginAgentController)
)
router.get('/logout', catchError(logoutAgentController))
router.get('/current-user', isAuthenticated, catchError(currentUserController))

//create
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
  '/add-limit-client',
  isAuthenticated,
  catchError(addLimitClientController)
)

// subtract limit
router.post(
  '/subtract-limit-client',
  isAuthenticated,
  catchError(subtractLimitClientController)
)

// login report
router.post(
  '/login-report-client',
  isAuthenticated,
  catchError(clientLoginReportController)
)

// report
router.post(
  '/report-client',
  isAuthenticated,
  catchError(clientReportController)
)

// get all users
router.post('/all-client', isAuthenticated, catchError(getAllClientController))

// status
// active
router.post(
  '/active-client',
  isAuthenticated,
  catchError(activeClientController)
)

// deactive
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
  '/update-client',
  isAuthenticated,
  catchError(updateClientController)
)

// get all user ledger
router.post(
  '/all-client-ledger',
  isAuthenticated,
  catchError(getAllClientLedgerController)
)

router.post('/get-child', isAuthenticated, catchError(getUserController))

export default router
