import adminRoute from './routers/admin.route'
import agentRoute from './routers/agent.route'
import clientRoute from './routers/client.route'
import masterRoute from './routers/master.route'
import subadminRoute from './routers/subadmin.route'
import superagentRoute from './routers/superagent.route'

export const ROUTER = [
  {
    path: '/admin',
    router: adminRoute
  },
  {
    path: '/subadmin',
    router: subadminRoute
  },
  {
    path: '/master',
    router: masterRoute
  },
  {
    path: '/superagent',
    router: superagentRoute
  },
  {
    path: '/agent',
    router: agentRoute
  },
  {
    path: '/client',
    router: clientRoute
  }
]
