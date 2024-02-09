import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { prisma } from '../prisma/prisma'
import { User } from '../ts/interfaces'
import { ROLES } from '../ts/type'
import { compareData } from '../utils/crypt'

const masterPassport = new passport.Passport()

masterPassport.use(
  new LocalStrategy({ usernameField: 'code' }, async (code, password, done) => {
    try {
      const masterdDb = await prisma.master.findUnique({
        where: { code: code }
      })
      if (!masterdDb) {
        return done({ message: 'Incorrect code and password' }, false)
      }
      if (!masterdDb.status) {
        return done({ message: 'Inactive user' }, false)
      }
      if (await compareData(password, masterdDb.password)) {
        return done(null, masterdDb)
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

masterPassport.serializeUser((user, done) => {
  done(null, (user as User).code)
})

masterPassport.deserializeUser(async (id: string, done) => {
  try {
    const masterDb = await prisma.master.findUnique({
      where: { code: id }
    })

    if (!masterDb) {
      throw new Error('Invalid user session')
    }
    const master = {
      ...masterDb,
      role: ROLES.Master
    }
    return done(null, master)
  } catch (error) {
    done(error, null)
  }
})

export { masterPassport }
