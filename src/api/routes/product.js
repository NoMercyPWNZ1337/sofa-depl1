import { Router } from 'express'
import multer from 'multer'

import authMiddleware from '../../shared/middleware/auth.js'
import roleMiddleware from '../../shared/middleware/role.js'
import {
  createProduct,
  uploadImage,
  getAllProducts,
  removeProduct,
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

router.delete(
  '/products/:id',
  [authMiddleware, roleMiddleware(['admin'])],
  removeProduct
)

router.post(
  '/create-product',
  [authMiddleware, roleMiddleware(['admin'])],
  createProduct
)

router.post(
  '/upload-image',
  [authMiddleware, roleMiddleware(['admin']), upload.single('image')],
  uploadImage
)

export default router
