import { prisma } from '../../prisma/prisma'
import { logLogin } from '../../utils/logger'

export const newLoginReportHandler = async (
  reportDb: string,
  user: {
    code: string
    name: string
  },
  ip: string
) => {
  const report = await (prisma[reportDb as keyof typeof prisma] as any).create({
    data: {
      code: user.code,
      ipAddress: ip,
      name: user.name
    }
  })
  logLogin.info(`${user.code}, ${ip}`)

  return {
    succuss: true,
    data: report
  }
}
