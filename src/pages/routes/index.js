import { Router } from 'express'
import path from 'path'

const router = Router()

const fullPathForPages = path.join(path.resolve() + '/src/pages')

router.get('/', (req, res) => {
  res.sendFile(fullPathForPages + '/index.html')
})

router.get('/login', (req, res) => {
  res.sendFile(fullPathForPages + '/login.html')
})

router.get('/registration', (req, res) => {
  res.sendFile(fullPathForPages + '/registration.html')
})

router.get('/admin-panel', (req, res) => {
  res.sendFile(fullPathForPages + '/admin-panel/index.html')
})

// Product
router.get('/admin-panel/product-list', (req, res) => {
  res.sendFile(fullPathForPages + '/admin-panel/product/product-list.html')
})

router.get('/admin-panel/add-product', (req, res) => {
  res.sendFile(fullPathForPages + '/admin-panel/product/add-product.html')
})

router.get('/admin-panel/edit-product', (req, res) => {
  res.sendFile(fullPathForPages + '/admin-panel/product/edit-product.html')
})
// - Product!

// Category
router.get('/admin-panel/category-list', (req, res) => {
  res.sendFile(fullPathForPages + '/admin-panel/category/category-list.html')
})

router.get('/admin-panel/add-category', (req, res) => {
  res.sendFile(fullPathForPages + '/admin-panel/category/add-category.html')
})

router.get('/admin-panel/edit-category', (req, res) => {
  res.sendFile(fullPathForPages + '/admin-panel/category/edit-category.html')
})
// - Category!

// Under Category
router.get('/admin-panel/under-category-list', (req, res) => {
  res.sendFile(
    fullPathForPages + '/admin-panel/under-category/under-category-list.html'
  )
})

router.get('/admin-panel/add-under-category', (req, res) => {
  res.sendFile(
    fullPathForPages + '/admin-panel/under-category/add-under-category.html'
  )
})

router.get('/admin-panel/edit-under-category', (req, res) => {
  res.sendFile(
    fullPathForPages + '/admin-panel/under-category/edit-under-category.html'
  )
})
// - Under Category!

router.get('/personal-account', (req, res) => {
  res.sendFile(fullPathForPages + '/personal-account/index.html')
})

router.get('/personal-account/shopping-cart', (req, res) => {
  res.sendFile(fullPathForPages + '/personal-account/shopping-cart.html')
})

router.get('/personal-account/favorites', (req, res) => {
  res.sendFile(fullPathForPages + '/personal-account/favorites.html')
})

router.get('/personal-account/orders-history', (req, res) => {
  res.sendFile(fullPathForPages + '/personal-account/orders-history.html')
})

router.get('/personal-account/orders-tracking', (req, res) => {
  res.sendFile(fullPathForPages + '/personal-account/orders-tracking.html')
})

router.get('/product', (req, res) => {
  res.sendFile(fullPathForPages + '/product.html')
})

router.get('/catalog', (req, res) => {
  res.sendFile(fullPathForPages + '/catalog.html')
})

router.get('/method-nakatani', (req, res) => {
  res.sendFile(fullPathForPages + '/method-nakatani.html')
})

export default router
