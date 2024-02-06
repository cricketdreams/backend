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

export const LIMIT_OPERATION = {
  Add: 'Add',
  Subtract: 'Subtract'
} as const

export type LimitOperation = keyof typeof LIMIT_OPERATION

export const LEDGER = {
  [ROLES.Admin]: 'AdminLedger',
  [ROLES.Subadmin]: 'SubadminLedger',
  [ROLES.Master]: 'MasterLedger',
  [ROLES.Superagent]: 'SuperagentLedger',
  [ROLES.Agent]: 'AgentLedger',
  [ROLES.Client]: 'ClientLedger'
} as const

export const AUTHORIZED_ROLES: { [key: string]: string[] } = {
  [ROLES.Admin]: [
    ROLES.Subadmin,
    ROLES.Master,
    ROLES.Superagent,
    ROLES.Agent,
    ROLES.Client
  ],
  [ROLES.Subadmin]: [ROLES.Master, ROLES.Superagent, ROLES.Agent, ROLES.Client],
  [ROLES.Master]: [ROLES.Superagent, ROLES.Agent, ROLES.Client],
  [ROLES.Superagent]: [ROLES.Agent, ROLES.Client],
  [ROLES.Agent]: [ROLES.Client]
}

export const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  FOUND: 302,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER: 500,
  SERVICE_UNAVAILABLE: 503,
} as const

export type HttpStatusCode = keyof typeof HTTP_STATUS_CODE