import { prisma } from '../../prisma/prisma'

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

  return {
    succuss: true,
    data: report
  }
}
