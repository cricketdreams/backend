import { Router } from 'express'

import { loginAgentController } from '../controllers/agent/auth.controller'
import { logoutClientController } from '../controllers/client/auth.controller'
import { clientPassport } from '../passport/client.passport'
import { catchError } from '../middlewares/catch-error'

const router = Router()

//auth
router.post(
  '/login',
  clientPassport.authenticate('local'),
  catchError(loginAgentController)
)
router.get('/logout', catchError(logoutClientController))

export default router
