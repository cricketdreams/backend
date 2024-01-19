import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { prisma } from '../prisma/prisma'
import { User } from '../ts/interfaces'
import { ROLES } from '../ts/type'
import { compareData } from '../utils/crypt'

const adminPassport = new passport.Passport()

adminPassport.use(
  new LocalStrategy({ usernameField: 'code' }, async (code, password, done) => {
    try {
      const admin = await prisma.admin.findUnique({
        where: { code: code }
      })
      if (!admin) {
        return done({ message: 'Incorrect code and password' }, false)
      }
      if (await compareData(password, admin.password)) {
        return done(null, admin)
      } else {
        return done({ message: 'Incorrect code and password' }, false)
      }
    } catch (error) {
      if (error instanceof Error)
        return done({ message: 'Incorrect code and password' }, false)
    }
  })
)

adminPassport.serializeUser((user, done) => {
  done(null, (user as User).code)
})

adminPassport.deserializeUser(async (id: string, done) => {
  try {
    const adminDb = await prisma.admin.findUnique({
      where: { code: id }
    })
    if (!adminDb) {
      throw new Error('Invalid user session')
    }
    const admin = {
      ...adminDb,
      role: ROLES.Admin
    }
    return done(null, admin)
  } catch (error) {
    done(error, null)
  }
})

export { adminPassport }
