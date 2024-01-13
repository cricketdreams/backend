import dotenv from 'dotenv'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { prisma } from '../prisma/prisma'
import { comparePassword } from '../utils/password'
// import { User, UserDocument, UserModel } from '../models/userModel'

dotenv.config()
const superagentPassport = new passport.Passport()

interface User {
  code: string
  password: string
}

superagentPassport.use(
  new LocalStrategy({ usernameField: 'code' }, async (code, password, done) => {
    try {
      const superagentDb = await prisma.superagent.findUnique({
        where: { code: code }
      })
      if (!superagentDb) {
        return done(null, false, { message: 'Invalid User.' })
      }
      if (!superagentDb.status) {
        return done(null, false, { message: 'User is inactive.' })
      }
      if (await comparePassword(password, superagentDb.password)) {
        return done(null, superagentDb)
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

superagentPassport.serializeUser((user, done) => {
  done(null, (user as User).code)
})

superagentPassport.deserializeUser(async (id: string, done) => {
  try {
    const superagentDb = await prisma.superagent.findUnique({
      where: { code: id }
    })

    if (!superagentDb) {
      throw new Error('User not found')
    }
    return done(null, superagentDb)
  } catch (error) {
    done(error, null)
  }
})

export { superagentPassport }
