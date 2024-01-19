import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { prisma } from '../prisma/prisma'
import { User } from '../ts/interfaces'
import { ROLES } from '../ts/type'
import { compareData } from '../utils/crypt'

const superagentPassport = new passport.Passport()

superagentPassport.use(
  new LocalStrategy({ usernameField: 'code' }, async (code, password, done) => {
    try {
      const superagentDb = await prisma.superagent.findUnique({
        where: { code: code }
      })
      if (!superagentDb) {
        return done({ message: 'Incorrect code and password' }, false)
      }
      if (!superagentDb.status) {
        return done({ message: 'Inactive user' }, false)
      }
      if (await compareData(password, superagentDb.password)) {
        return done(null, superagentDb)
      } else {
        return done(null, false, {
          message: 'Incorrect code and password'
        })
      }
    } catch (error) {
      if (error instanceof Error)
        return done({ message: error.message || 'Invalid input' }, false)
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
      throw new Error('Invalid user session')
    }
    const superagent = {
      ...superagentDb,
      role: ROLES.Superagent
    }
    return done(null, superagent)
  } catch (error) {
    done(error, null)
  }
})

export { superagentPassport }
