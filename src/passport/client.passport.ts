import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { prisma } from '../prisma/prisma'
import { User } from '../ts/interfaces'
import { ROLES } from '../ts/type'
import { compareData } from '../utils/crypt'

const clientPassport = new passport.Passport()

clientPassport.use(
  new LocalStrategy({ usernameField: 'code' }, async (code, password, done) => {
    try {
      const clientDb = await prisma.client.findUnique({
        where: { code: code }
      })
      if (!clientDb) {
        return done({ message: 'Incorrect code and password' }, false)
      }
      if (!clientDb.status) {
        return done({ message: 'Inactive user' }, false)
      }
      if (await compareData(password, clientDb.password)) {
        return done(null, clientDb)
      } else {
        return done(null, false, {
          message: 'Something went wrong'
        })
      }
    } catch (error) {
      if (error instanceof Error)
        return done({ message: error.message || 'Invalid input' }, false)
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
      throw new Error('Invalid user session')
    }
    const client = {
      ...clientDb,
      role: ROLES.Client
    }
    return done(null, client)
  } catch (error) {
    done(error, null)
  }
})

export { clientPassport }
