import { Router } from 'express'

import {
  createAgentController,
  createClientController,
  createMasterController,
  createSuperagentController
} from '../controllers/create.controller'
import {
  loginSubadminController,
  logoutSubadminController
} from '../controllers/subadmin/auth.controller'
import { isAuthenticate } from '../middlewares/check-auth'
import {} from '../passport/admin.passport'
import { subadminPassport } from '../passport/subadmin.passport'
import { catchError } from '../middlewares/catch-error'

const router = Router()

//auth
router.post(
  '/login',
  subadminPassport.authenticate('local'),
  catchError(loginSubadminController)
)
router.get('/logout', catchError(logoutSubadminController))

//create
router.post(
  '/create-master',
  isAuthenticate,
  catchError(createMasterController)
)
router.post(
  '/create-superagent',
  isAuthenticate,
  catchError(createSuperagentController)
)
router.post('/create-agent', isAuthenticate, catchError(createAgentController))
router.post(
  '/create-client',
  isAuthenticate,
  catchError(createClientController)
)

export default router
