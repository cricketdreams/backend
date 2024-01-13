import { adminPassport } from './passport/admin.passport'
import { subadminPassport } from './passport/subadmin.passport'

import adminRoute from './routers/admin.route'
import agentRoute from './routers/agent.route'
import clientRoute from './routers/client.route'
import masterRoute from './routers/master.route'
import subadminRoute from './routers/subadmin.route'
import superagentRoute from './routers/superagent.route'

const version = 'v1'

export const ROUTER = [
  {
    path: `/api/${version}/admin`,
    router: adminRoute,
    middleware: [adminPassport.initialize(), adminPassport.session()]
  },
  {
    path: `/api/${version}/subadmin`,
    router: subadminRoute,
    middleware: [subadminPassport.initialize(), subadminPassport.session()]
  },
  {
    path: `/api/${version}/master`,
    router: masterRoute,
    middleware: [subadminPassport.initialize(), subadminPassport.session()]
  },
  {
    path: `/api/${version}/superagent`,
    router: superagentRoute,
    middleware: [subadminPassport.initialize(), subadminPassport.session()]
  },
  {
    path: `/api/${version}/agent`,
    router: agentRoute,
    middleware: [subadminPassport.initialize(), subadminPassport.session()]
  },
  {
    path: `/api/${version}/client`,
    router: clientRoute,
    middleware: [subadminPassport.initialize(), subadminPassport.session()]
  }
]
