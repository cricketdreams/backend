import dotenv from 'dotenv'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { prisma } from '../prisma/prisma'
import { comparePassword } from '../utils/password'
// import { User, UserDocument, UserModel } from '../models/userModel'

dotenv.config()
const clientPassport = new passport.Passport()

interface User {
  code: string
  password: string
}

clientPassport.use(
  new LocalStrategy({ usernameField: 'code' }, async (code, password, done) => {
    try {
      const clientDb = await prisma.client.findUnique({
        where: { code: code }
      })
      if (!clientDb) {
        return done(null, false, { message: 'Invalid User.' })
      }
      if (!clientDb.status) {
        return done(null, false, { message: 'User is inactive.' })
      }
      if (await comparePassword(password, clientDb.password)) {
        return done(null, clientDb)
      } else {
        return done(null, false, { message: 'Incorrect password.' })
      }
    } catch (error) {
      if (error instanceof Error)
        return done(null, false, {
          message: error.message || 'Incorrect username or password.'
        })
    }
  })
)

clientPassport.serializeUser((user, done) => {
  done(null, (user as User).code)
})

clientPassport.deserializeUser(async (id: string, done) => {
  try {
    const clientDb = await prisma.client.findUnique({
      where: { code: id }
    })

    console.log(clientDb)
  } catch (error) {
    done(error, null)
  }
})

export { clientPassport }
