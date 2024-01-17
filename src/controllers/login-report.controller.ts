import { Request, Response } from 'express'

import { getLoginReportHandler } from '../handlers/login-report.handler'
import { LOGIN_REPORT_DB } from '../ts/type'

export const adminLoginReportController = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.body
  const result = await getLoginReportHandler(
    LOGIN_REPORT_DB.AdminLoginReport,
    startDate,
    endDate
  )
  console.log(result)
  return res.status(200).json({
    data: result
  })
}

export const subadminLoginReportController = async (req: Request, res: Response) => {
  const { subadminCode, startDate, endDate } = req.body
  const result = await getLoginReportHandler(
    LOGIN_REPORT_DB.SubadminLoginReport,
    startDate,
    endDate,
    subadminCode
  )
  return res.status(200).json({
    data: result
  })
}

export const masterLoginReportController = async (req: Request, res: Response) => {
  const { masterCode, startDate, endDate } = req.body
  const result = await getLoginReportHandler(
    LOGIN_REPORT_DB.MasterLoginReport,
    startDate,
    endDate,
    masterCode
  )
  return res.status(200).json({
    data: result
  })
}

export const superagentLoginReportController = async (
  req: Request,
  res: Response
) => {
  const { superagentCode, startDate, endDate } = req.body
  const result = await getLoginReportHandler(
    LOGIN_REPORT_DB.SuperagentLoginReport,
    startDate,
    endDate,
    superagentCode
  )
  return res.status(200).json({
    data: result
  })
}

export const agentLoginReportController = async (req: Request, res: Response) => {
  const { agentCode, startDate, endDate } = req.body
  const result = await getLoginReportHandler(
    LOGIN_REPORT_DB.AgentLoginReport,
    startDate,
    endDate,
    agentCode
  )
  return res.status(200).json({
    data: result
  })
}

export const clientLoginReportController = async (req: Request, res: Response) => {
  const { clientCode, startDate, endDate } = req.body
  const result = await getLoginReportHandler(
    LOGIN_REPORT_DB.ClientLoginReport,
    startDate,
    endDate,
    clientCode
  )
  return res.status(200).json({
    data: result
  })
}
