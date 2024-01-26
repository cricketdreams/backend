import { Request, Response } from 'express'

import { prisma } from '../../prisma/prisma'
import { encryptData } from '../../utils/crypt'
import { updateClientValidator } from '../../validators/update.validator'

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
  } = updateClientValidator.parse(req.body)

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
  return res.json({ success: true })
}
