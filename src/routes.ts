import { adminPassport } from './passport/admin.passport'
import { agentPassport } from './passport/agent.passport'
import { clientPassport } from './passport/client.passport'
import { masterPassport } from './passport/master.passport'
import { subadminPassport } from './passport/subadmin.passport'
import { superagentPassport } from './passport/superagent.passport'

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
    middleware: [masterPassport.initialize(), masterPassport.session()]
  },
  {
    path: `/api/${version}/superagent`,
    router: superagentRoute,
    middleware: [superagentPassport.initialize(), superagentPassport.session()]
  },
  {
    path: `/api/${version}/agent`,
    router: agentRoute,
    middleware: [agentPassport.initialize(), agentPassport.session()]
  },
  {
    path: `/api/${version}/client`,
    router: clientRoute,
    middleware: []
  }
]
