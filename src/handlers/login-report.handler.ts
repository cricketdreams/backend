import { prisma } from '../prisma/prisma'
import { logLogin } from '../utils/logger'

export const newLoginReportHandler = async (
  reportDb: string,
  user: {
    code: string
    name: string
  },
  ip: string
) => {
  await (prisma[reportDb as keyof typeof prisma] as any).create({
    data: {
      code: user.code,
      ipAddress: ip,
      name: user.name
    }
  })
  logLogin.info(`${user.code}, ${ip}`)

  return true
}

export const getLoginReportHandler = async (
  reportDb: string,
  startDate: Date,
  endDate: Date,
  code?: string
) => {
  let report
  if (code) {
    report = await (prisma[reportDb as keyof typeof prisma] as any).findMany({
      where: {
        code,
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      }
    })
  } else {
    report = await prisma.adminLoginReport.findMany({
      where: {
        code,
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      }
    })
  }

  return report
}
