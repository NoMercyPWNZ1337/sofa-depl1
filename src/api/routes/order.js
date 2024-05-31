import { Router } from 'express'

import authMiddleware from '../middleware/auth.js'

import { OrderController } from '../controllers/order.js'

const router = Router()

router.get('/orders', [authMiddleware], OrderController.getAll)
router.post('/orders', [authMiddleware], OrderController.create)

export default router
