import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { prisma } from '../prisma/prisma'
import { User } from '../ts/interfaces'
import { ROLES } from '../ts/type'
import { compareData } from '../utils/crypt'

const agentPassport = new passport.Passport()

agentPassport.use(
  new LocalStrategy({ usernameField: 'code' }, async (code, password, done) => {
    try {
      const agentData = await prisma.agent.findUnique({
        where: { code: code }
      })
      if (!agentData) {
        return done({ message: 'Incorrect code and password' }, false)
      }
      if (!agentData.status) {
        return done({ message: 'Inactive user' }, false)
      }
      if (await compareData(password, agentData.password)) {
        return done(null, agentData)
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

agentPassport.serializeUser((user, done) => {
  done(null, (user as User).code)
})

agentPassport.deserializeUser(async (id: string, done) => {
  try {
    const agentDb = await prisma.agent.findUnique({
      where: { code: id }
    })

    if (!agentDb) {
      throw new Error('Invalid user session')
    }
    const agent = {
      ...agentDb,
      role: ROLES.Agent
    }
    return done(null, agent)
  } catch (error) {
    done(error, null)
  }
})

export { agentPassport }
