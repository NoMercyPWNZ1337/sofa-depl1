;(async () => {
  const { searchProduct } = await import('./components/search-product.js')
  const { addToCart } = await import('./components/add-to-cart.js')
  const { addToFavorite } = await import('./components/add-to-favorite.js')
  const { toggleMenu } = await import('./components/toggle-menu.js')
  const { dropdownCategories } = await import(
    './components/dropdown-categories.js'
  )

  searchProduct()
  dropdownCategories()
  addToCart()
  addToFavorite()
  toggleMenu()
})()
