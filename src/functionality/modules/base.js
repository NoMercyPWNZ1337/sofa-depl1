;(async () => {
  const { searchProduct } = await import('./components/search-product.js')
  const { dropdownCategories } = await import(
    './components/dropdown-categories.js'
  )

  searchProduct()
  dropdownCategories()
})()
