import { Request, Response } from 'express'

export const logoutHandler = (req: Request, res: Response, path: string) => {
  return req.logout(err => {
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
