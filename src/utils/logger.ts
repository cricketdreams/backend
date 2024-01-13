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

const logFatal = createLogger({
  levels: logLevels,
  level: 'error',
  format: combine(timestamp({ format: dateFormat }), logFormat),
  transports: [new transports.File({ filename: path.join(log, 'Fatal.log') })]
})

const logNull = createLogger({
  levels: logLevels,
  level: 'debug',
  format: combine(timestamp({ format: dateFormat }), logFormat),
  transports: [
    new transports.File({ filename: path.join(log, 'NullError.log') })
  ]
})

const logInfo = createLogger({
  levels: logLevels,
  level: 'info',
  format: combine(timestamp({ format: dateFormat }), logFormat),
  transports: [new transports.File({ filename: path.join(log, 'Info.log') })]
})

const logCatchError = createLogger({
  levels: logLevels,
  level: 'error',
  format: combine(timestamp({ format: dateFormat }), logFormat),
  transports: [
    new transports.File({ filename: path.join(log, 'CatchError.log') })
  ]
})

const logResReq = createLogger({
  levels: logLevels,
  level: 'info',
  format: combine(timestamp({ format: dateFormat }), logFormat),
  transports: [
    new transports.File({ filename: path.join(log, 'ResReq.log') })
  ]
})

export { logNull, logInfo, logCatchError, logResReq, logFatal }
