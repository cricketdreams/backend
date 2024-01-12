import { Router } from 'express'
import { prisma } from '../prisma/prisma'

const router = Router()

router.post('/createAdmin', async (req, res) => {
  const { code, password } = req.body
  const result = await prisma.admin.create({
    data: {
      name: 'Raj Dubey',
      code,
      password,
      mobile: 3456789
    }
  })
  res.status(201).json({
    data: result,
    message: 'Admin created successfully'
  })
})

router.post('/login', async (req, res) => {
  const { code, password } = req.body
  const result = await prisma.admin.findFirst({
    where: {
      code,
      password
    }
  })
  res.json({
    data: result
  })
})

export default router
