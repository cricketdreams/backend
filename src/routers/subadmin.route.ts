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
import {
  addLimitAgentController,
  addLimitClientController,
  addLimitMasterController,
  addLimitSuperagentController,
  subtractLimitMasterController,
  subtractLimitSuperagentController,
  subtractLimitAgentController,
  subtractLimitClientController
} from '../controllers/subadmin/limit.controller'

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

// limit
// add limit
router.post('/add-limit-master', isAuthenticate, addLimitMasterController)
router.post(
  '/add-limit-superagent',
  isAuthenticate,
  addLimitSuperagentController
)
router.post('/add-limit-agent', isAuthenticate, addLimitAgentController)
router.post('/add-limit-client', isAuthenticate, addLimitClientController)

// subtract limit
router.post(
  '/subtract-limit-master',
  isAuthenticate,
  subtractLimitMasterController
)
router.post(
  '/subtract-limit-superagent',
  isAuthenticate,
  subtractLimitSuperagentController
)
router.post(
  '/subtract-limit-agent',
  isAuthenticate,
  subtractLimitAgentController
)
router.post(
  '/subtract-limit-client',
  isAuthenticate,
  subtractLimitClientController
)

export default router
