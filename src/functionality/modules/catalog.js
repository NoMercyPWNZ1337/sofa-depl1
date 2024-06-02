const actualDOM = () => {
  return {
    catalogFilters: document.querySelector('#catalog-filters'),
    products: document.querySelector('#products'),
  }
}

const searchProducts = async ({ searchQuery }) => {
  const { ProductService } = await import('../services/product.js')
  const { productCard } = await import('./components/product-card.js')
  const { addToCart } = await import('./components/add-to-cart.js')
  const { addToFavorite } = await import('./components/add-to-favorite.js')

  const DOM = actualDOM()

  const responseProducts = await ProductService.getAllByQuery({
    searchQuery,
  })

  if (!responseProducts.success) return responseProducts

  if (responseProducts.products.length) {
    const productListHtml = responseProducts.products.map(product => {
      return productCard({ product })
    })

    DOM.products.innerHTML = productListHtml.join('')

    addToCart()
    addToFavorite()
  } else {
    DOM.products.innerHTML = '<h3>Товарів не знайдено</h3>'
  }
}

;(async () => {
  const searchQuery = window.location.search
  const DOM = actualDOM()

  try {
    await searchProducts({ searchQuery })
  } catch (error) {
    console.log(error)
  }

  console.log(DOM.catalogFilters)
  DOM.catalogFilters.addEventListener('submit', async e => {
    e.preventDefault()

    const minPrice = e.target.min.value
    const maxPrice = e.target.max.value
    const withRecipe = e.target.withRecipe.checked
    let generateSearchQuery = searchQuery

    if (minPrice) generateSearchQuery += `&minPrice=${minPrice}`
    if (maxPrice) generateSearchQuery += `&maxPrice=${maxPrice}`
    generateSearchQuery += `&withRecipe=${withRecipe}`

    searchProducts({ searchQuery: generateSearchQuery })
  })
})()
