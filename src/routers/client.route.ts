import { Router } from 'express'

import { loginAgentController } from '../controllers/agent/auth.controller'
import { logoutClientController } from '../controllers/client/auth.controller'
import { catchError } from '../middlewares/catch-error'
import { clientPassport } from '../passport/client.passport'
import { isAuthenticated } from '../middlewares/check-auth'
import { updatePasswordController } from '../controllers/update-password.controller'
import { ledgerController } from '../controllers/ledger.controller'
import { currentUserController } from '../controllers/current-user.controller'

const router = Router()

//auth
router.post(
  '/login',
  clientPassport.authenticate('local'),
  catchError(loginAgentController)
)
router.get('/logout', catchError(logoutClientController))
router.get('/current-user', isAuthenticated, catchError(currentUserController))

router.post('/ledger', isAuthenticated, catchError(ledgerController))

// update password
router.post(
  '/update-password',
  isAuthenticated,
  catchError(updatePasswordController)
)

export default router
