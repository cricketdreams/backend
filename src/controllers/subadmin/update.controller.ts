import { Request, Response } from 'express'
import { prisma } from '../../prisma/prisma'
import { encryptData } from '../../utils/crypt'

export const updateMasterController = async (req: Request, res: Response) => {
  const {
    masterCode,
    newName,
    newReference,
    newPassword,
    newMobile,
    flatShare,
    casinoPlay,
    masterShare,
    masterCasinoShare,
    masterMobileShare,
    newMatchCommission,
    newSessionCommission,
    newCasinoCommission
  } = req.body
  const encryptedPassword = await encryptData(newPassword)
  await prisma.master.update({
    where: {
      code: masterCode
    },
    data: {
      name: newName,
      reference: newReference,
      password: encryptedPassword,
      mobile: newMobile,
      flatShare: flatShare,
      casinoPlay: casinoPlay,
      share: masterShare,
      casinoShare: masterCasinoShare,
      mobileShare: masterMobileShare,
      matchCommission: newMatchCommission,
      sessionCommission: newSessionCommission,
      casinoCommission: newCasinoCommission
    }
  })
  return res.status(200).end
}

export const updateSuperagentController = async (
  req: Request,
  res: Response
) => {
  const {
    superagentCode,
    newName,
    newReference,
    newPassword,
    newMobile,
    flatShare,
    casinoPlay,
    superagentShare,
    superagentCasinoShare,
    newMatchCommission,
    newSessionCommission,
    newCasinoCommission
  } = req.body
  const encryptedPassword = await encryptData(newPassword)
  await prisma.superagent.update({
    where: {
      code: superagentCode
    },
    data: {
      name: newName,
      reference: newReference,
      password: encryptedPassword,
      mobile: newMobile,
      flatShare: flatShare,
      casinoPlay: casinoPlay,
      share: superagentShare,
      casinoShare: superagentCasinoShare,
      matchCommission: newMatchCommission,
      sessionCommission: newSessionCommission,
      casinoCommission: newCasinoCommission
    }
  })
  return res.status(200).end
}

export const updateAgentController = async (req: Request, res: Response) => {
  const {
    agentCode,
    newName,
    newReference,
    newPassword,
    newMobile,
    flatShare,
    casinoPlay,
    agentShare,
    agentCasinoShare,
    agentMobileShare,
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
      share: agentShare,
      casinoShare: agentCasinoShare,
      mobileShare: agentMobileShare,
      matchCommission: newMatchCommission,
      sessionCommission: newSessionCommission,
      casinoCommission: newCasinoCommission
    }
  })
  return res.status(200).end
}

export const updateClientController = async (req: Request, res: Response) => {
  const {
    clientCode,
    newName,
    newPassword,
    newMobile,
    casinoPlay,
    newMatchCommission,
    newSessionCommission,
    newMobileCommission,
    newCasinoCommission
  } = req.body

  const encryptedPassword = await encryptData(newPassword)

  await prisma.client.update({
    where: {
      code: clientCode
    },
    data: {
      name: newName,
      password: encryptedPassword,
      mobile: newMobile,
      casinoPlay: casinoPlay,
      mobileCharge: newMobileCommission,
      matchCommission: newMatchCommission,
      sessionCommission: newSessionCommission,
      casinoCommission: newCasinoCommission
    }
  })
  return res.status(200).end
}
