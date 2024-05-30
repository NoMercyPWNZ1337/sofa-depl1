import { Router } from 'express'

import authMiddleware from '../../shared/middleware/auth.js'

import { OrderController } from '../controllers/order.js'

const router = Router()

router.get('/orders', [authMiddleware], OrderController.getAll)
router.post('/orders', [authMiddleware], OrderController.create)
router.put('/orders/:id', [authMiddleware], OrderController.update)

export default router
