import { prisma } from '../prisma/prisma'
import { ReportDb } from '../ts/type'

export const getReportHandler = async (
  reportDb: ReportDb,
  startDate: string,
  endDate: string,
  code?: string
) => {
  const startDateObject = new Date(startDate)
  const endDateObject = new Date(endDate)

  // Decrease the day by one for startDate
  startDateObject.setDate(startDateObject.getDate() - 1)
  endDateObject.setDate(endDateObject.getDate() + 1)

  const isoStartDate = startDateObject.toISOString()
  const isoEndDate = endDateObject.toISOString()
  
  let report
  if (code) {
    report = await (prisma[reportDb as keyof typeof prisma] as any).findMany({
      where: {
        code,
        createdAt: {
          gte: isoStartDate,
          lte: isoEndDate
        }
      }
    })
  } else {
    report = await prisma.adminReport.findMany({
      where: {
        createdAt: {
          gte: isoStartDate,
          lte: isoEndDate
        }
      }
    })
  }

  return report
}
