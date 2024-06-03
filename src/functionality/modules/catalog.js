const actualDOM = () => {
  return {
    catalogFilters: document.querySelector('#catalog-filters'),
    products: document.querySelector('#products'),
    watchedProductsSection: document.querySelector('#watched-products'),
    watchedProducts: document.querySelector('#watched-products-swiper'),
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
  const { watchedProducts } = await import('./components/watched-products.js')

  const searchQuery = window.location.search
  const DOM = actualDOM()

  try {
    await searchProducts({ searchQuery })
    watchedProducts({ DOM })
  } catch (error) {
    console.log(error)
  }

  DOM.catalogFilters.addEventListener('submit', async e => {
    e.preventDefault()

    const minPrice = e.target.min.value
    const maxPrice = e.target.max.value
    const withDiscounted = e.target.withDiscounted.checked
    const withRecipe = e.target.withRecipe.checked
    let generateSearchQuery = searchQuery

    console.log(withDiscounted)

    if (minPrice) generateSearchQuery += `&minPrice=${minPrice}`
    if (maxPrice) generateSearchQuery += `&maxPrice=${maxPrice}`
    if (withDiscounted) {
      generateSearchQuery += `&withDiscounted=${withDiscounted}`
    }
    generateSearchQuery += `&withRecipe=${withRecipe}`

    searchProducts({ searchQuery: generateSearchQuery })
  })
})()
