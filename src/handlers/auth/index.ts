import { Request, Response } from 'express'

export const logoutHandler = async (req: Request, res: Response, path: string) => {
  req.logout(err => {
    if (err) {
      res.status(500).json({ message: err })
    } else {
      req.session.destroy(err => {
        if (err) {
          res.status(500).json({ message: err })
        } else {
          res.redirect(path)
        }
      })
    }
  })
}
