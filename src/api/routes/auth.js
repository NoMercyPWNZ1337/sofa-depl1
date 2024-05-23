import { Router } from 'express'

import {
  login,
  registration,
  checkAuth,
  checkAccess,
} from '../controllers/auth.js'
import { loginValidators, registrationValidators } from '../validators/auth.js'

const router = Router()

router.post('/login', loginValidators, login)
router.post('/registration', registrationValidators, registration)

router.get('/check-auth', checkAuth)
router.get('/check-access', checkAccess.bind(['admin']))

export default router
