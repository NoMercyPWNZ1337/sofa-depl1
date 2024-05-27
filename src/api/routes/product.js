import { Router } from 'express'
import multer from 'multer'
import fs from 'fs'

import authMiddleware from '../../shared/middleware/auth.js'
import roleMiddleware from '../../shared/middleware/role.js'

import { productValidators } from '../validators/product.js'

import { ProductController } from '../controllers/product.js'

const router = Router()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    fs.mkdirSync('public/images', { recursive: true })
    cb(null, 'public/images')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

router.get('/products/search', [productValidators], ProductController.search)

router.get(
  '/products',
  [authMiddleware, roleMiddleware(['admin'])],
  ProductController.getAll
)

router.get('/products/discounted', ProductController.getDiscountedProducts)

router.get(
  '/products/:id',
  [authMiddleware, roleMiddleware(['admin'])],
  ProductController.getOne
)

router.delete(
  '/products/:id',
  [authMiddleware, roleMiddleware(['admin'])],
  ProductController.remove
)

router.post(
  '/products',
  [authMiddleware, roleMiddleware(['admin']), productValidators],
  ProductController.create
)

router.put(
  '/products/:id',
  [authMiddleware, roleMiddleware(['admin']), productValidators],
  ProductController.update
)

router.post(
  '/upload-image',
  [authMiddleware, roleMiddleware(['admin']), upload.single('image')],
  ProductController.uploadImage
)

export default router
