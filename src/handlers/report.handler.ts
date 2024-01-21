import { prisma } from '../prisma/prisma'
import { ReportDb } from '../ts/type'

export const getReportHandler = async (
  reportDb: ReportDb,
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
    report = await prisma.adminReport.findMany({
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
