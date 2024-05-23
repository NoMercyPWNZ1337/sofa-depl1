import { Router } from 'express'
import path from 'path'

import roleMiddleware from '../shared/middleware/role.js'
import authMiddleware from '../shared/middleware/auth.js'

const router = Router()

const fullPathForPages = path.join(path.resolve() + '/src/pages')

router.get('/', (req, res) => {
  res.sendFile(fullPathForPages + '/index.html')
})

router.get('/login', (req, res) => {
  res.sendFile(fullPathForPages + '/login.html')
})

router.get('/registration', (req, res) => {
  res.sendFile(fullPathForPages + '/registration.html')
})

router.get('/admin-panel', (req, res) => {
  res.sendFile(fullPathForPages + '/admin-panel.html')
})

export default router
