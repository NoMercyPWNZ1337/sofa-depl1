import { Router } from 'express'

import authMiddleware from '../middleware/auth.js'

import { UserController } from '../controllers/user.js'

import { userValidators } from '../validators/user.js'

const router = Router()

router.put('/user/:id', [authMiddleware, userValidators], UserController.update)

export default router
