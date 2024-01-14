import { Router } from 'express'

import {
  addLimitAgentController,
  addLimitClientController,
  addLimitMasterController,
  addLimitSubadminController,
  addLimitSuperagentController,
  subtractLimitAgentController,
  subtractLimitClientController,
  subtractLimitMasterController,
  subtractLimitSubadminController,
  subtractLimitSuperagentController
} from '../controllers/admin/limit.controller'
import {
  createAdminController,
  loginAdminController,
  logoutAdminController
} from '../controllers/admin/auth.controller'
import {
  createAgentController,
  createClientController,
  createMasterController,
  createSubadminController,
  createSuperagentController
} from '../controllers/create.controller'
import { isAuthenticate } from '../middlewares/check-auth'
import { adminPassport } from '../passport/admin.passport'
import { catchError } from '../middlewares/catch-error'

const router = Router()

//auth
// only for development
router.post('/create-admin', catchError(createAdminController))
router.post(
  '/login',
  adminPassport.authenticate('local'),
  catchError(loginAdminController)
)
router.get('/logout', catchError(logoutAdminController))

//create
router.post(
  '/create-subadmin',
  isAuthenticate,
  catchError(createSubadminController)
)
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

// active deactivate

router.post(
  '/active-subadmin',
  isAuthenticate,
  catchError(createSubadminController)
)
router.post(
  '/active-master',
  isAuthenticate,
  catchError(createMasterController)
)
router.post(
  '/active-superagent',
  isAuthenticate,
  catchError(createSuperagentController)
)
router.post('/active-agent', isAuthenticate, catchError(createAgentController))
router.post(
  '/active-client',
  isAuthenticate,
  catchError(createClientController)
)

// limit
// add limit
router.post('/add-limit-subadmin', isAuthenticate, addLimitSubadminController)
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
  '/subtract-limit-subadmin',
  isAuthenticate,
  subtractLimitSubadminController
)
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
