import { Request, Response } from 'express'
import { prisma } from '../../prisma/prisma'
import { encryptData } from '../../utils/crypt'

export const updateAgentController = async (req: Request, res: Response) => {
  const {
    agentCode,
    newName,
    newReference,
    newPassword,
    newMobile,
    flatShare,
    casinoPlay,
    newMatchCommission,
    newSessionCommission,
    newCasinoCommission
  } = req.body
  const encryptedPassword = await encryptData(newPassword)
  await prisma.agent.update({
    where: {
      code: agentCode
    },
    data: {
      name: newName,
      reference: newReference,
      password: encryptedPassword,
      mobile: newMobile,
      flatShare: flatShare,
      casinoPlay: casinoPlay,
      matchCommission: newMatchCommission,
      sessionCommission: newSessionCommission,
      casinoCommission: newCasinoCommission
    }
  })
  return res.status(200).json({ success: true })
}

export const updateClientController = async (req: Request, res: Response) => {
  const {
    clientCode,
    newName,
    newPassword,
    newMobile,
    casinoPlay,
    newMobileCommission,
    newMatchCommission,
    newSessionCommission,
    newCasinoCommission
  } = req.body
  const encryptedPassword = await encryptData(newPassword)
  await prisma.client.update({
    where: {
      code: clientCode
    },
    data: {
      name: newName,
      mobile: newMobile,
      password: encryptedPassword,
      matchCommission: newMatchCommission,
      sessionCommission: newSessionCommission,
      mobileCharge: newMobileCommission,
      casinoCommission: newCasinoCommission,
      casinoPlay: casinoPlay
    }
  })
  return res.status(200).json({ success: true })
}
