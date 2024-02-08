import { Request, Response } from 'express'

import { getReportHandler } from '../handlers/report.handler'
import { REPORT_DB, ReportDb } from '../ts/type'
import { codeAndDatesValidator } from '../validators/general.validator'
import { CONST } from '../constants'

const GetReportController =
  (reportDb: ReportDb) => async (req: Request, res: Response) => {
    const { code, startDate, endDate } = codeAndDatesValidator.parse(req.body)
    const page = parseInt(req.query.page as string)
    const limit = parseInt(req.query.limit as string) || CONST.take
    const result = await getReportHandler({
      reportDb,
      startDate,
      endDate,
      code,
      page,
      limit
    })
    return res.status(200).json({ data: result })
  }

export const adminReportController = GetReportController(REPORT_DB.AdminReport)
export const subadminReportController = GetReportController(
  REPORT_DB.SubadminReport
)
export const masterReportController = GetReportController(
  REPORT_DB.MasterReport
)
export const superagentReportController = GetReportController(
  REPORT_DB.SuperagentReport
)
export const agentReportController = GetReportController(REPORT_DB.AgentReport)
export const clientReportController = GetReportController(
  REPORT_DB.ClientReport
)
