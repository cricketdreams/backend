import { createLogger, format, transports } from 'winston'
import path from 'path'

const { combine, timestamp, printf } = format

const logFormat = printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`)

const log = 'logs'
const dateFormat = 'YYYY-MM-DD HH:mm:ss'

const logNull = createLogger({
  level: 'debug',
  format: combine(
    timestamp({ format: dateFormat }),
    logFormat
  ),
  transports: [new transports.File({ filename: path.join(log, 'NullError.log') })]
})

const logInfo = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: dateFormat }),
    logFormat
  ),
  transports: [new transports.File({ filename: path.join(log, 'Info.log') })]
})

const logCatchError = createLogger({
  level: 'error',
  format: combine(
    timestamp({ format: dateFormat }),
    logFormat
  ),
  transports: [new transports.File({ filename: path.join(log, 'CatchError.log') })]
})

export { logNull, logInfo, logCatchError }
