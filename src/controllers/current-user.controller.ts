import { Request, Response } from 'express'

export const currentUserController = (req: Request, res: Response) => {
  res.json({
    currentUser: req.user
  })
}
