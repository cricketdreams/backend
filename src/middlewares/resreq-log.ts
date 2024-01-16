import { Request, Response, NextFunction } from 'express'
import { logResReq } from '../utils/logger'

export function resreqLog(req: Request, res: Response, next: NextFunction) {
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `In -> Method: [${req.method}], URL: [${req.url}], IP: [${req.socket.remoteAddress}]`
    )
    res.on('finish', () => {
      console.log(
        `Out -> Status: [${res.statusCode}], URL: [${req.url}], IP: [${req.socket.remoteAddress}], Method: [${req.method}]`
      )
    })
  } else {
    logResReq.info(
      `In -> Method: [${req.method}], URL: [${req.url}], IP: [${req.socket.remoteAddress}]`
    )
    res.on('finish', () => {
      logResReq.info(
        `Out -> Status: [${res.statusCode}], URL: [${req.url}], IP: [${req.socket.remoteAddress}], Method: [${req.method}]`
      )
    })
  }
  next()
}
