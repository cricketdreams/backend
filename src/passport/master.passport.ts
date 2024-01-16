import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { prisma } from '../prisma/prisma'
import { comparePassword } from '../utils/password'
import { User } from '../ts/interfaces'

const masterPassport = new passport.Passport()

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
        return done(null, false, { message: 'Incorrect username and password.' })
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

    if (!masterDb) {
      throw new Error('User not found')
    }
    return done(null, masterDb)
  } catch (error) {
    done(error, null)
  }
})

export { masterPassport }
