import dotenv from 'dotenv'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { prisma } from '../prisma/prisma'
import { comparePassword } from '../utils/password'
// import { User, UserDocument, UserModel } from '../models/userModel'

const adminPassport = new passport.Passport();
dotenv.config()

interface User {
  code: string
  password: string
}

adminPassport.use(
  new LocalStrategy(
    { usernameField: 'code' },
    async (code, password, done) => {
      try {
        console.log(code, password)
        const admin = await prisma.admin.findUnique({
          where: { code: code }
        })

        if(!admin ) {
          return done(null, false, { message: 'Invalid User.' })
        }
        if(await comparePassword(password, admin.password)) {
          return done(null, admin)
        } else {
          return done(null, false, { message: 'Incorrect password.' })
        }
      } catch (error) {
        if(error instanceof Error)
        return done(null, false, {
          message: error.message || 'Incorrect username or password.'
        })
      }
    }
  )
)

adminPassport.serializeUser((user, done) => {
  done(null, (user as User).code)
})

adminPassport.deserializeUser(async (id: string, done) => {
  try {
    const adminDb = await prisma.admin.findUnique({
      where: { code: id },
    });

    console.log(adminDb)

  } catch (error) {
    done(error, null);
  }
});

export { adminPassport }
