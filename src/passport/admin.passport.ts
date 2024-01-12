import dotenv from 'dotenv'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import signinHandler from '../handlers/signin.handler'
import { prisma } from '../prisma/prisma'
// import { User, UserDocument, UserModel } from '../models/userModel'

dotenv.config()
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (code, password, done) => {
      try {

      } catch (error) {
        return done(null, false, {
          message: error.message || 'Incorrect username or password.'
        })
      }
    }
  )
)

passport.serializeUser((user: UserDocument, done) => {
  done(null, user._id.toString())
})

passport.deserializeUser(async (id, done) => {
  const userDb = await prisma..findById(id)
  let user = {
    _id: userDb?._id,
    firstname: userDb?.firstname,
    lastname: userDb?.lastname,
    email: userDb?.email,
    googleId: userDb?.googleId,
    githubId: userDb?.githubId,
    slug: userDb?.slug
  }

  if (userDb?.slug) {
    const candidate = await getCandidate(user.slug)
    ;(user as User).information = {
      role: candidate.position,
      skills: candidate.skill,
      city: candidate.city,
      country: candidate.country,
      locality: candidate.locality,
      resume: {
        file_link: candidate.resume?.file_link
      }
    }
  }
  done(null, user)
})

export { passport }
