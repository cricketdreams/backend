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

const router = Router()

//auth
router.post(
  '/login',
  subadminPassport.authenticate('local'),
  loginSubadminController
)
router.get('/logout', logoutSubadminController)

//create
router.post('/create-master', isAuthenticate, createMasterController)
router.post('/create-superagent', isAuthenticate, createSuperagentController)
router.post('/create-agent', isAuthenticate, createAgentController)
router.post('/create-client', isAuthenticate, createClientController)

export default router
