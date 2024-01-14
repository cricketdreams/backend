export const ROLES = {
  admin: 'admin',
  subadmin: 'subadmin',
  master: 'master',
  superagent: 'superagent',
  agent: 'agent',
  client: 'client'
} as const

export type Roles = keyof typeof ROLES
