import { Router } from 'express'

export const router = Router()
export const name = 'sample'

router.get('/hello', (_req, res) => {
  res.send('Hello World!')
})
