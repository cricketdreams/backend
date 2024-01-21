export const ROLES = {
  Admin: 'Admin',
  Subadmin: 'Subadmin',
  Master: 'Master',
  Superagent: 'Superagent',
  Agent: 'Agent',
  Client: 'Client'
} as const

export type Roles = keyof typeof ROLES

export const USER_CODE = {
  AD: ROLES.Admin,
  SB: ROLES.Subadmin,
  MA: ROLES.Master,
  SA: ROLES.Superagent,
  AG: ROLES.Agent,
  CL: ROLES.Client
}

export const LOGIN_REPORT_DB = {
  AdminLoginReport: 'AdminLoginReport',
  SubadminLoginReport: 'SubadminLoginReport',
  MasterLoginReport: 'MasterLoginReport',
  SuperagentLoginReport: 'SuperagentLoginReport',
  AgentLoginReport: 'AgentLoginReport',
  ClientLoginReport: 'ClientLoginReport'
} as const

export type LoginReportDb = keyof typeof LOGIN_REPORT_DB

export const REPORT_DB = {
  AdminReport: 'AdminReport',
  SubadminReport: 'SubadminReport',
  MasterReport: 'MasterReport',
  SuperagentReport: 'SuperagentReport',
  AgentReport: 'AgentReport',
  ClientReport: 'ClientReport'
} as const

export type ReportDb = keyof typeof REPORT_DB
