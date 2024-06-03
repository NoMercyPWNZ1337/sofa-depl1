import { Router } from 'express'
import multer from 'multer'
import fs from 'fs'

import authMiddleware from '../middleware/auth.js'
import roleMiddleware from '../middleware/role.js'

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

router.get('/products/search', ProductController.search)

router.get('/products/watched/:productIds', ProductController.getAllByIds)

router.get('/products/discounted', ProductController.getDiscountedProducts)

router.get('/products/query', ProductController.getAllByQuery)

router.get(
  '/products/query/manufacturers',
  ProductController.getAllManufactures
)

router.get(
  '/products/shopping-cart/:productIds',
  [authMiddleware],
  ProductController.getAllByIds
)

router.get(
  '/products/favorites/:productIds',
  [authMiddleware],
  ProductController.getAllByIds
)

router.get(
  '/products',
  [authMiddleware, roleMiddleware(['admin'])],
  ProductController.getAll
)

router.get('/products/:id', ProductController.getOne)

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
