import { Router } from 'express'
import multer from 'multer'

import authMiddleware from '../../shared/middleware/auth.js'
import roleMiddleware from '../../shared/middleware/role.js'

import { productValidators } from '../validators/product.js'

import {
  createProduct,
  uploadImage,
  getAllProducts,
  removeProduct,
  getOneProduct,
  updateProduct,
} from '../controllers/product.js'

const router = Router()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'public/images')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

router.get(
  '/products',
  [authMiddleware, roleMiddleware(['admin'])],
  getAllProducts
)

router.get(
  '/products/:id',
  [authMiddleware, roleMiddleware(['admin'])],
  getOneProduct
)

router.delete(
  '/products/:id',
  [authMiddleware, roleMiddleware(['admin'])],
  removeProduct
)

router.post(
  '/create-product',
  [authMiddleware, roleMiddleware(['admin']), productValidators],
  createProduct
)

router.put(
  '/update-product/:id',
  [authMiddleware, roleMiddleware(['admin']), productValidators],
  updateProduct
)

router.post(
  '/upload-image',
  [authMiddleware, roleMiddleware(['admin']), upload.single('image')],
  uploadImage
)

export default router
