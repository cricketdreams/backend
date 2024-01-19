import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { prisma } from '../prisma/prisma'
import { User } from '../ts/interfaces'
import { ROLES } from '../ts/type'
import { compareData } from '../utils/crypt'

const subadminPassport = new passport.Passport()

subadminPassport.use(
  new LocalStrategy({ usernameField: 'code' }, async (code, password, done) => {
    try {
      const subadmin = await prisma.subadmin.findUnique({
        where: { code: code }
      })
      if (!subadmin) {
        return done({ message: 'Incorrect code and password' }, false)
      }
      if (!subadmin.status) {
        return done({ message: 'Inactive user' }, false)
      }
      if (await compareData(password, subadmin.password)) {
        return done(null, subadmin)
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

subadminPassport.serializeUser((user, done) => {
  done(null, (user as User).code)
})

subadminPassport.deserializeUser(async (id: string, done) => {
  try {
    const subadminDb = await prisma.subadmin.findUnique({
      where: { code: id }
    })
    if (!subadminDb) {
      throw new Error('Invalid user session')
    }
    const subadmin = {
      ...subadminDb,
      role: ROLES.Subadmin
    }
    return done(null, subadmin)
  } catch (error) {
    done(error, null)
  }
})

export { subadminPassport }
