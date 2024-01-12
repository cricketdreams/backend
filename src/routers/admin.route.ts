import { Router } from 'express'
import { adminPassport } from '../passport/admin.passport'
import { prisma } from '../prisma/prisma'
import { hashPassword } from '../utils/password'
import generateCode from '../utils/generateCode'

const router = Router()

router.post('/createAdmin', async (req, res) => {
  const { name } = req.body
  const code = generateCode('admin')
  const password = '2341324'
  const hashedPassword = await hashPassword(password)
  const result = await prisma.admin.create({
    data: {
      name,
      code,
      password: hashedPassword,
      mobile: 3456789
    }
  })
  res.status(201).json({
    data: result,
    message: 'Admin created successfully'
  })
})

router.post('/login', adminPassport.authenticate('local'), async (req, res) => {
  res.status(200).json({
    data: req.user,
    message: 'Login successfully'
  })
})

export default router
