import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { prisma } from '../prisma/prisma'
import { compareData } from '../utils/crypt'
import { User } from '../ts/interfaces'
import { ROLES } from '../ts/type'

const clientPassport = new passport.Passport()

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
      if (await compareData(password, clientDb.password)) {
        return done(null, clientDb)
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

clientPassport.serializeUser((user, done) => {
  done(null, (user as User).code)
})

clientPassport.deserializeUser(async (id: string, done) => {
  try {
    const clientDb = await prisma.client.findUnique({
      where: { code: id }
    })

    if (!clientDb) {
      throw new Error('User not found')
    }
    const client = {
      ...clientDb,
      role: ROLES.Agent
    }
    return done(null, client)
  } catch (error) {
    done(error, null)
  }
})

export { clientPassport }
