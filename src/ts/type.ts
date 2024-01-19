export const ROLES = {
  Admin: 'Admin',
  Subadmin: 'Subadmin',
  Master: 'Master',
  Superagent: 'Superagent',
  Agent: 'Agent',
  Client: 'Client'
} as const

export type Roles = keyof typeof ROLES

export const LOGIN_REPORT_DB = {
  AdminLoginReport: 'AdminLoginReport',
  SubadminLoginReport: 'SubadminLoginReport',
  MasterLoginReport: 'MasterLoginReport',
  SuperagentLoginReport: 'SuperagentLoginReport',
  AgentLoginReport: 'AgentLoginReport',
  ClientLoginReport: 'ClientLoginReport'
} as const

export type LoginReportDb = keyof typeof LOGIN_REPORT_DB
