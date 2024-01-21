import { Request, Response } from 'express'

import { getReportHandler } from '../handlers/report.handler'
import { REPORT_DB, ReportDb } from '../ts/type'

const GetReportController =
  (reportDb: ReportDb) => async (req: Request, res: Response) => {
    const { code, startDate, endDate } = req.body
    const result = await getReportHandler(reportDb, startDate, endDate, code)
    return res.status(200).json({ data: result })
  }

export const adminReportController = GetReportController(
  REPORT_DB.AdminReport
)
export const subadminReportController = GetReportController(
  REPORT_DB.SubadminReport
)
export const masterReportController = GetReportController(
  REPORT_DB.MasterReport
)
export const superagentReportController = GetReportController(
  REPORT_DB.SuperagentReport
)
export const agentReportController = GetReportController(
  REPORT_DB.AgentReport
)
export const clientReportController = GetReportController(
  REPORT_DB.ClientReport
)
