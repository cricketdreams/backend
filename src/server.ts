import dotenv from 'dotenv'
dotenv.config()

import compression from 'compression'
import MongoStore from 'connect-mongo'
import express from 'express'
import flash from 'express-flash'
import session from 'express-session'
import helmet from 'helmet'
import http from 'http'
import morgan from 'morgan'

import { CONST } from './constants'
import errorHandler from './middlewares/error'
import { ROUTER } from './routes'
import { logFatal, logResReq } from './utils/logger'
import cors from 'cors'

const app = express()

process.on('uncaughtException', err => {
  logFatal.log('fatal', `uncaught exception, ${err.message}, ${err.stack}`)
  process.exit(1)
})

process.on('unhandledRejection', err => {
  throw err
})

const morganMiddleware = morgan(
  ':remote-addr, :remote-user, :method, :url, HTTP/:http-version, :status, :res[content-length], :referrer, :user-agent',
  { stream: { write: message => logResReq.info(message.trim()) } }
)

const serverConfig = () => {
  app.use(helmet())
  app.use(compression())
  app.use(
    session({
      secret: 'test is tought ug sdfsdf',
      resave: true,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: process.env.SESSION_STORE
      }),
      cookie: {
        maxAge: CONST.maxAge,
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
      }
    })
  )
  app.use(
    cors({
      origin: 'http://localhost:3001',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true
    })
  )
  app.use(flash())
  app.use(morganMiddleware)
  // app.use(morgan('dev'))

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
