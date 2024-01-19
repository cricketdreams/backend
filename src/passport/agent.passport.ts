import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { prisma } from '../prisma/prisma'
import { compareData } from '../utils/crypt'
import { User } from '../ts/interfaces'
import { ROLES } from '../ts/type'

const agentPassport = new passport.Passport()

agentPassport.use(
  new LocalStrategy({ usernameField: 'code' }, async (code, password, done) => {
    try {
      const agentData = await prisma.agent.findUnique({
        where: { code: code }
      })
      if (!agentData) {
        return done(null, false, { message: 'Invalid User.' })
      }
      if (!agentData.status) {
        return done(null, false, { message: 'User is inactive.' })
      }
      if (await compareData(password, agentData.password)) {
        return done(null, agentData)
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

agentPassport.serializeUser((user, done) => {
  done(null, (user as User).code)
})

agentPassport.deserializeUser(async (id: string, done) => {
  try {
    const agentDb = await prisma.agent.findUnique({
      where: { code: id }
    })

    if (!agentDb) {
      throw new Error('User not found')
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
