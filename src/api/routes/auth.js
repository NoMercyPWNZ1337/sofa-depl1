import { Router } from 'express'

import { login, registration, checkAuth } from '../controllers/auth.js'
import { loginValidators, registrationValidators } from '../validators/auth.js'

const router = Router()

router.post('/login', loginValidators, login)
router.post('/registration', registrationValidators, registration)

router.get('/check-auth', checkAuth)

// import authMiddleware from '../../shared/middleware/auth.js'
// router.get('/account/profile', authMiddleware, registration)

export default router
