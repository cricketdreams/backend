import { createLogger, format, transports } from 'winston'
import path from 'path'

const { combine, timestamp, printf } = format

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5
}

const logFormat = printf(
  ({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`
)

const log = 'logs'
const dateFormat = 'YYYY-MM-DD HH:mm:ss'

const errorFilter = format((info, opts) =>
  info.level === 'error' ? info : false
)

const infoFilter = format((info, opts) =>
  info.level === 'info' ? info : false
)

const debugFilter = format((info, opts) =>
  info.level === 'debug' ? info : false
)

const logFatal = createLogger({
  levels: logLevels,
  level: 'error',
  format: combine(timestamp({ format: dateFormat }), logFormat),
  transports: [new transports.File({ filename: path.join(log, 'Fatal.log') })]
})

const logger = createLogger({
  levels: logLevels,
  level: 'debug',
  format: combine(timestamp({ format: dateFormat }), logFormat),
  transports: [
    new transports.File({
      filename: path.join(log, 'Error.log'),
      level: 'error',
      format: combine(errorFilter(), timestamp(), logFormat)
    }),
    new transports.File({
      filename: path.join(log, 'Info.log'),
      level: 'info',
      format: combine(infoFilter(), timestamp(), logFormat)
    }),
    new transports.File({
      filename: path.join(log, 'Null.log'),
      level: 'debug',
      format: combine(debugFilter(), timestamp(), logFormat)
    })
  ]
})

const logResReq = createLogger({
  levels: logLevels,
  level: 'info',
  format: combine(timestamp({ format: dateFormat }), logFormat),
  transports: [new transports.File({ filename: path.join(log, 'ResReq.log') })]
})

export { logger, logResReq, logFatal }
