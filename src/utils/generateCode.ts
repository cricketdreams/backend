import { prisma } from '../prisma/prisma'
import { Roles } from '../ts/type'

export default async function generateCode(role: Roles): Promise<string> {
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
  } while (await checkInDatabase(generatedCode, role))

  return generatedCode
}

async function checkInDatabase(
  generatedCode: string,
  userType: Roles
): Promise<boolean> {
  const user = await (
    prisma[userType as keyof typeof prisma] as any
  ).findUnique({
    where: {
      code: generatedCode
    }
  })

  return user !== null
}
