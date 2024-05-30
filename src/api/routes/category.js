import { Router } from 'express'

import authMiddleware from '../middleware/auth.js'
import roleMiddleware from '../middleware/role.js'

import { categoryValidators } from '../validators/category.js'
import { CategoryController } from '../controllers/category.js'

const router = Router()

router.get(
  '/categories',
  [authMiddleware, roleMiddleware(['admin'])],
  CategoryController.getAll
)

router.get(
  '/categories/:id',
  [authMiddleware, roleMiddleware(['admin'])],
  CategoryController.getOne
)

router.delete(
  '/categories/:id',
  [authMiddleware, roleMiddleware(['admin'])],
  CategoryController.remove
)

router.post(
  '/categories',
  [authMiddleware, roleMiddleware(['admin']), categoryValidators],
  CategoryController.create
)

router.put(
  '/categories/:id',
  [authMiddleware, roleMiddleware(['admin']), categoryValidators],
  CategoryController.update
)

export default router
