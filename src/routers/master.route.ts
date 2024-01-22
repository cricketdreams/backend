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

const router = Router()

//auth
router.post(
  '/login',
  masterPassport.authenticate('local'),
  catchError(loginMasterController)
)
router.get('/logout', catchError(logoutMasterController))

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

export default router
