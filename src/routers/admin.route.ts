import { Router } from 'express'

import {
  addLimitAgentController,
  addLimitClientController,
  addLimitMasterController,
  addLimitSubadminController,
  addLimitSuperagentController
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

const router = Router()

//auth
// only for development
router.post('/create-admin', createAdminController)
router.post('/login', adminPassport.authenticate('local'), loginAdminController)
router.get('/logout', logoutAdminController)

//create
router.post('/create-subadmin', isAuthenticate, createSubadminController)
router.post('/create-master', isAuthenticate, createMasterController)
router.post('/create-superagent', isAuthenticate, createSuperagentController)
router.post('/create-agent', isAuthenticate, createAgentController)
router.post('/create-client', isAuthenticate, createClientController)

// limit
// router.post('/add-limit-subadmin', isAuthenticate, addLimitSubadminController)
// router.post('/add-limit-master', isAuthenticate, addLimitMasterController)
// router.post(
//   '/add-limit-superagent',
//   isAuthenticate,
//   addLimitSuperagentController
// )
// router.post('/add-limit-agent', isAuthenticate, addLimitAgentController)
// router.post('/add-limit-client', isAuthenticate, addLimitClientController)

export default router
