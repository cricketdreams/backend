import { prisma } from '../prisma/prisma'
import { LoginReportDb } from '../ts/type'
import { logLogin } from '../utils/logger'

export const newLoginReportHandler = async (
  reportDb: LoginReportDb,
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
  reportDb: LoginReportDb,
  startDate: string,
  endDate: string,
  code?: string
) => {
  let report
  const startDateObject = new Date(startDate)
  const endDateObject = new Date(endDate)

  // Decrease the day by one for startDate
  startDateObject.setDate(startDateObject.getDate() - 1)
  endDateObject.setDate(endDateObject.getDate() + 1)

  const isoStartDate = startDateObject.toISOString()
  const isoEndDate = endDateObject.toISOString()
  
  if (code) {
    report = await (prisma[reportDb as keyof typeof prisma] as any).findMany({
      where: {
        code,
        createdAt: {
          gte: isoStartDate,
          lte: isoEndDate
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  } else {
    report = await prisma.adminLoginReport.findMany({
      where: {
        code,
        createdAt: {
          gte: isoStartDate,
          lte: isoEndDate
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  return report
}
