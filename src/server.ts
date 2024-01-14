import express from 'express'
import http from 'http'
import flash from 'express-flash'
import session from 'express-session'
import helmet from 'helmet'
import compression from 'compression'

import { ROUTER } from './routes'
import errorHandler from './middlewares/error'
import { logFatal, logResReq } from './utils/logger'
import { CONST } from './config'

const app = express()

process.on('uncaughtException', err => {
  logFatal.log('fatal', 'uncaught exception') // See later
  process.exit(1)
})

process.on('unhandledRejection', err => {
  throw err
})

const serverConfig = () => {
  app.use(helmet())
  app.use(compression())
  app.use(
    session({
      secret: 'test is tought ug sdfsdf',
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: CONST.maxAge,
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
      }
    })
  )
  // app.use(
  //   cors({
  //     origin: 'http://localhost:5173',
  //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //     credentials: true
  //   })
  // )
  app.use(flash())
  app.use((req, res, next) => {
    logResReq.info(
      `Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    )
    res.on('finish', () => {
      logResReq.info(
        `Outgoing -> Status: [${res.statusCode}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Method: [${req.method}]`
      )
    })
    next()
  })

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  ROUTER.forEach(route => {
    app.use(route.path, ...route.middleware)
    app.use(route.path, route.router)
  })

  app.use(errorHandler)

  const PORT = process.env.PORT || 3000
  http
    .createServer(app)
    .listen(PORT, () =>
      console.log(`Express is listening at http://localhost:${PORT}`)
    )
}

serverConfig()
