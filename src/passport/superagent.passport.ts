import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { prisma } from '../prisma/prisma'
import { compareData } from '../utils/password'
import { User } from '../ts/interfaces'
import { ROLES } from '../ts/type'

const superagentPassport = new passport.Passport()

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
      if (await compareData(password, superagentDb.password)) {
        return done(null, superagentDb)
      } else {
        return done(null, false, {
          message: 'Incorrect username and password.'
        })
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
