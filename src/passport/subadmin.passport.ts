import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { prisma } from '../prisma/prisma'
import { compareData } from '../utils/password'
import { User } from '../ts/interfaces'

const subadminPassport = new passport.Passport()

subadminPassport.use(
  new LocalStrategy({ usernameField: 'code' }, async (code, password, done) => {
    try {
      const subadmin = await prisma.subadmin.findUnique({
        where: { code: code }
      })
      if (!subadmin) {
        return done(null, false, { message: 'Invalid User.' })
      }
      if (!subadmin.status) {
        return done(null, false, { message: 'User is inactive.' })
      }
      if (await compareData(password, subadmin.password)) {
        return done(null, subadmin)
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

subadminPassport.serializeUser((user, done) => {
  done(null, (user as User).code)
})

subadminPassport.deserializeUser(async (id: string, done) => {
  try {
    const subadminDb = await prisma.subadmin.findUnique({
      where: { code: id }
    })

    if (!subadminDb) {
      throw new Error('User not found')
    }
    const subadmin = {
      ...subadminDb,
      role: 'Admin'
    }
    return done(null, subadmin)
  } catch (error) {
    done(error, null)
  }
})

export { subadminPassport }
