import { Router } from 'express'

import authMiddleware from '../middleware/auth.js'

import { OrderController } from '../controllers/order.js'

const router = Router()

router.get(
  '/orders/active/:userId',
  [authMiddleware],
  OrderController.getAllActive
)

router.get(
  '/orders/history/:userId',
  [authMiddleware],
  OrderController.getAllNotActive
)

router.post('/orders', [authMiddleware], OrderController.create)

export default router
