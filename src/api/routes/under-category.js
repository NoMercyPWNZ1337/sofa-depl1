import { Router } from 'express'

import authMiddleware from '../../shared/middleware/auth.js'
import roleMiddleware from '../../shared/middleware/role.js'

import { underCategoryValidators } from '../validators/under-category.js'

import { UnderCategoryController } from '../controllers/under-category.js'

const router = Router()

router.get(
  '/under-categories',
  [authMiddleware, roleMiddleware(['admin'])],
  UnderCategoryController.getAll
)

router.get(
  '/under-categories/:id',
  [authMiddleware, roleMiddleware(['admin'])],
  UnderCategoryController.getOne
)

router.delete(
  '/under-categories/:id',
  [authMiddleware, roleMiddleware(['admin'])],
  UnderCategoryController.remove
)

router.post(
  '/under-categories',
  [authMiddleware, roleMiddleware(['admin']), underCategoryValidators],
  UnderCategoryController.create
)

router.put(
  '/under-categories/:id',
  [authMiddleware, roleMiddleware(['admin']), underCategoryValidators],
  UnderCategoryController.update
)

export default router