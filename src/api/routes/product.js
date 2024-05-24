import { Router } from 'express'
import multer from 'multer'

import authMiddleware from '../../shared/middleware/auth.js'
import roleMiddleware from '../../shared/middleware/role.js'
import { createProduct, uploadImage } from '../controllers/product.js'

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

router.post('/create-product', createProduct)
router.post(
  '/upload-image',
  [authMiddleware, roleMiddleware(['admin']), upload.single('image')],
  uploadImage
)

export default router
