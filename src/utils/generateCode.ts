import { prisma } from '../prisma/prisma'
import { Roles } from '../ts/type'

export default function generateCode(role: Roles): string {
  let generatedCode: string
  role = role.toLowerCase() as Roles

  const rolesMap: Record<Roles, string> = {
    admin: 'AD',
    subadmin: 'SB',
    master: 'MA',
    superagent: 'SA',
    agent: 'AG',
    client: 'CL'
  }

  do {
    const randomNumber = Math.floor(100000 + Math.random() * 900000)
    const roleInitial = rolesMap[role]
    generatedCode = roleInitial + randomNumber.toString()
  } while (checkInDatabase(generatedCode, role))

  return generatedCode
}

async function checkInDatabase(
  generatedCode: string,
  role: Roles
): Promise<boolean> {
  let user
  if (role === 'subadmin') {
    const user = await prisma.subAdmin.findUnique({
      where: { code: generatedCode }
    })
  } else if (role === 'master') {
    const user = await prisma.master.findUnique({
      where: { code: generatedCode }
    })
  } else if (role === 'superagent') {
    const user = await prisma.superAgent.findUnique({
      where: { code: generatedCode }
    })
  } else if (role === 'agent') {
    const user = await prisma.agent.findUnique({
      where: { code: generatedCode }
    })
  } else if (role === 'client') {
    const user = await prisma.client.findUnique({
      where: { code: generatedCode }
    })
  }

  return user !== null
}
