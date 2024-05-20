import { Router } from 'express'
import path from 'path'

const router = Router()

router.get('/', (req, res) => {
  res.sendFile(path.join(`${path.resolve()}/src/pages/index.html`))
})

router.get('/login', (req, res) => {
  res.sendFile(path.join(`${path.resolve()}/src/pages/login.html`))
})

router.get('/registration', (req, res) => {
  res.sendFile(path.join(`${path.resolve()}/src/pages/registration.html`))
})

export default router
