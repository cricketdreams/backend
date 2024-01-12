import dotenv from 'dotenv'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { prisma } from '../prisma/prisma'
import { comparePassword } from '../utils/password'
// import { User, UserDocument, UserModel } from '../models/userModel'

dotenv.config()
const masterPassport = new passport.Passport()

interface User {
  code: string
  password: string
}

masterPassport.use(
  new LocalStrategy({ usernameField: 'code' }, async (code, password, done) => {
    try {
      const masterdDb = await prisma.master.findUnique({
        where: { code: code }
      })
      if (!masterdDb) {
        return done(null, false, { message: 'Invalid User.' })
      }
      if (!masterdDb.status) {
        return done(null, false, { message: 'User is inactive.' })
      }
      if (await comparePassword(password, masterdDb.password)) {
        return done(null, masterdDb)
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

masterPassport.serializeUser((user, done) => {
  done(null, (user as User).code)
})

masterPassport.deserializeUser(async (id: string, done) => {
  try {
    const masterDb = await prisma.master.findUnique({
      where: { code: id }
    })

    console.log(masterDb)
  } catch (error) {
    done(error, null)
  }
})

export { masterPassport }
