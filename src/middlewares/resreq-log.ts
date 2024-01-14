import { Request, Response, NextFunction } from 'express'
import { logResReq } from '../utils/logger'

export function resreqLog(req: Request, res: Response, next: NextFunction) {
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    )
    res.on('finish', () => {
      console.log(
        `Outgoing -> Status: [${res.statusCode}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Method: [${req.method}]`
      )
    })
  } else {
    logResReq.info(
      `Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    )
    res.on('finish', () => {
      logResReq.info(
        `Outgoing -> Status: [${res.statusCode}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Method: [${req.method}]`
      )
    })
  }
  next()
}
