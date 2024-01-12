import { adminPassport } from './passport/admin.passport'
import { subadminPassport } from './passport/subadmin.passport'

import adminRoute from './routers/admin.route'
import agentRoute from './routers/agent.route'
import clientRoute from './routers/client.route'
import masterRoute from './routers/master.route'
import subadminRoute from './routers/subadmin.route'
import superagentRoute from './routers/superagent.route'

export const ROUTER = [
  {
    path: '/admin',
    router: adminRoute,
    middleware: [adminPassport.initialize(), adminPassport.session()]
  },
  {
    path: '/subadmin',
    router: subadminRoute,
    middleware: [subadminPassport.initialize(), subadminPassport.session()]
  },
  {
    path: '/master',
    router: masterRoute,
    middleware: [subadminPassport.initialize(), subadminPassport.session()]
  },
  {
    path: '/superagent',
    router: superagentRoute,
    middleware: [subadminPassport.initialize(), subadminPassport.session()]
  },
  {
    path: '/agent',
    router: agentRoute,
    middleware: [subadminPassport.initialize(), subadminPassport.session()]
  },
  {
    path: '/client',
    router: clientRoute,
    middleware: [subadminPassport.initialize(), subadminPassport.session()]
  }
]
