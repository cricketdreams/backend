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
} from '../controllers/agent/limit.controller'
import { clientLoginReportController } from '../controllers/login-report.controller'
import { getAllClientController } from '../controllers/get-all-users.controller'
import {
  activeClientController,
  deactiveClientController
} from '../controllers/status.controller'
import { updatePasswordController } from '../controllers/update-password.controller'
import { denaTransactionController, lenaTransactionController } from '../controllers/transaction.controller'

const router = Router()

//auth
router.post(
  '/login',
  agentPassport.authenticate('local'),
  catchError(loginAgentController)
)
router.get('/logout', catchError(logoutAgentController))

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

// get all users
router.get('/all-client', isAuthenticated, catchError(getAllClientController))

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

export default router
