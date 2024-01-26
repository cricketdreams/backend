import { Request, Response } from 'express'

import { getLoginReportHandler } from '../handlers/login-report.handler'
import { LOGIN_REPORT_DB, LoginReportDb } from '../ts/type'
import { codeAndDatesValidator } from '../validators/general.validator'

const GetLoginReportController =
  (reportDb: LoginReportDb) => async (req: Request, res: Response) => {
    const { code, startDate, endDate } = codeAndDatesValidator.parse(
      req.body
    )
    const result = await getLoginReportHandler(
      reportDb,
      startDate,
      endDate,
      code
    )
    return res.status(200).json({ data: result })
  }

export const adminLoginReportController = GetLoginReportController(
  LOGIN_REPORT_DB.AdminLoginReport
)
export const subadminLoginReportController = GetLoginReportController(
  LOGIN_REPORT_DB.SubadminLoginReport
)
export const masterLoginReportController = GetLoginReportController(
  LOGIN_REPORT_DB.MasterLoginReport
)
export const superagentLoginReportController = GetLoginReportController(
  LOGIN_REPORT_DB.SuperagentLoginReport
)
export const agentLoginReportController = GetLoginReportController(
  LOGIN_REPORT_DB.AgentLoginReport
)
export const clientLoginReportController = GetLoginReportController(
  LOGIN_REPORT_DB.ClientLoginReport
)
