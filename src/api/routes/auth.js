import { Router } from 'express'

import { AuthController } from '../controllers/auth.js'
import { loginValidators, registrationValidators } from '../validators/auth.js'

const router = Router()

router.post('/login', loginValidators, AuthController.login)
router.post(
  '/registration',
  registrationValidators,
  AuthController.registration
)

router.get('/check-auth', AuthController.checkAuth)
router.get('/check-access', AuthController.checkAccess.bind(['admin']))

export default router
