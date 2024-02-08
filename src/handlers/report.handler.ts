import { prisma } from '../prisma/prisma'
import { ReportDb } from '../ts/type'

export const getReportHandler = async ({
  reportDb,
  startDate,
  endDate,
  code,
  page,
  limit
}: {
  reportDb: ReportDb
  startDate: string
  endDate: string
  code?: string
  page?: number
  limit: number
}) => {
  const startDateObject = new Date(startDate)
  const endDateObject = new Date(endDate)

  // Decrease the day by one for startDate
  startDateObject.setDate(startDateObject.getDate() - 1)
  endDateObject.setDate(endDateObject.getDate() + 1)

  const isoStartDate = startDateObject.toISOString()
  const isoEndDate = endDateObject.toISOString()

  const skip = page ? (page - 1) * limit : 0

  let report
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
      },
      skip,
      take: limit
    })
  } else {
    report = await (prisma[reportDb as keyof typeof prisma] as any).findMany({
      where: {
        createdAt: {
          gte: isoStartDate,
          lte: isoEndDate
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    })
  }

  return report
}
