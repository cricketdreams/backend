import dotenv from 'dotenv'
dotenv.config()

import compression from 'compression'
import express from 'express'
import flash from 'express-flash'
import session from 'express-session'
import helmet from 'helmet'
import http from 'http'

import { CONST } from './config'
import errorHandler from './middlewares/error'
import { resreqLog } from './middlewares/resreq-log'
import { ROUTER } from './routes'
import { logFatal } from './utils/logger'

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
  app.use(resreqLog)

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
