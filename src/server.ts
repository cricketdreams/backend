import express from 'express'
import http from 'http'
import { ROUTER } from './routes'
import errorHandler from './utils/error'

import flash from 'express-flash'
import session from 'express-session'
import { adminPassport } from './passport/admin.passport'
import { subadminPassport } from './passport/subadmin.passport'

const app = express()

// to caught uncaught exception
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  process.exit(1)
})
// unhandled promise rejection
process.on('unhandledRejection', err => {
  throw err
})

const serverConfig = () => {
  app.use(
    session({
      secret: 'test is tought ug sdfsdf',
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // One week
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
      }
    })
  )
  // app.use(adminPassport.initialize())
  // app.use(adminPassport.session())
  // app.use(
  //   cors({
  //     origin: 'http://localhost:5173',
  //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //     credentials: true
  //   })
  // )
  app.use(flash())
  app.use((req, res, next) => {
    console.log(
      `Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Method: [${req.method}]`
    )
    res.on('finish', () => {
      console.log(
        `Outgoing -> Status: [${res.statusCode}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Method: [${req.method}]`
      )
    })
    next()
  })

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(errorHandler as any)

  ROUTER.forEach(route => {
    app.use(route.path, ...route.middleware)
    app.use(route.path,route.router)
  })

  const PORT = process.env.PORT || 3000
  http
    .createServer(app)
    .listen(PORT, () =>
      console.log(`Express is listening at http://localhost:${PORT}`)
    )
}

serverConfig()
