import { logGeneratedCode } from './logger'

const ROLES = {
  admin: 'admin',
  subadmin: 'subadmin',
  master: 'master',
  superagent: 'superagent',
  agent: 'agent',
  client: 'client'
} as const

type Roles = keyof typeof ROLES

export default function generateCode(role: Roles): string {
  let generatedCode: string
  role = role.toLowerCase() as Roles

  const rolesMap: Record<Roles, string> = {
    admin: 'AD',
    subadmin: 'S',
    master: 'M',
    superagent: 'SA',
    agent: 'A',
    client: 'C'
  }

  do {
    const randomNumber = Math.floor(100000 + Math.random() * 900000)
    const roleInitial = rolesMap[role]
    generatedCode = roleInitial + randomNumber.toString()
  } while (checkInDatabase(generatedCode, role))

  logGeneratedCode.info(`New user created: ${generatedCode}`)
  return generatedCode
}

function checkInDatabase(code: string, role: Roles): boolean {
  // check code in database
  return false
}
