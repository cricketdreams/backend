import express from 'express'
import http from 'http'
import errorHandler from './middlewares/error'
import { ROUTER } from './routes'

// import flash from 'express-flash'
// import session from 'express-session'

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
  console.log('Server configuration started')
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
    app.use(route.path, route.router)
  })

  const PORT = process.env.PORT || 3000
  http
    .createServer(app)
    .listen(PORT, () =>
      console.log(`Express is listening at http://localhost:${PORT}`)
    )
}

serverConfig()
