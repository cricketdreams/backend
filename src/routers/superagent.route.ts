import { Router } from 'express'

import {
  createAgentController,
  createClientController
} from '../controllers/create.controller'

import {
  loginSuperagentController,
  logoutSuperagentController
} from '../controllers/superagent/auth.controller'
import { isAuthenticated } from '../middlewares/check-auth'
import { masterPassport } from '../passport/master.passport'
import { catchError } from '../middlewares/catch-error'
import {
  addLimitAgentController,
  addLimitClientController,
  subtractLimitAgentController,
  subtractLimitClientController
} from '../controllers/superagent/limit.controller'
import {
  agentLoginReportController,
  clientLoginReportController
} from '../controllers/login-report.controller'
import {
  getAllAgentController,
  getAllClientController
} from '../controllers/get-all-users.controller'
import {
  activeAgentController,
  activeClientController,
  deactiveAgentController,
  deactiveClientController
} from '../controllers/status.controller'
import { updatePasswordController } from '../controllers/update-password.controller'
import { denaTransactionController, lenaTransactionController } from '../controllers/transaction.controller'

const router = Router()

//auth
router.post(
  '/login',
  masterPassport.authenticate('local'),
  catchError(loginSuperagentController)
)
router.get('/logout', catchError(logoutSuperagentController))

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

// get all users
router.get('/all-agent', isAuthenticated, catchError(getAllAgentController))
router.get('/all-client', isAuthenticated, catchError(getAllClientController))

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
export default router
