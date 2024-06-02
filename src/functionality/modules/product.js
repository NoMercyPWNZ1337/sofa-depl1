const actualDOM = () => {
  return {
    product: document.querySelector('#product'),
    watchedProductsSection: document.querySelector('#watched-products'),
    watchedProducts: document.querySelector('#watched-products-swiper'),
  }
}

const productTemplate = ({ product }) => {
  const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || []
  const favorites = JSON.parse(localStorage.getItem('favorites')) || []
  const hasInCart = shoppingCart.includes(product._id)
  const hasInFavorites = favorites.includes(product._id)

  return `
    <div class="product-row">
      <img
        class="product-image"
        src="${product.image}"
        alt="product image"
      />
      <div>
        <h1 class="product-title">
          <span>${product.name}</span>
          <button
            class="product-favorite ${hasInFavorites && 'active'}"
            data-to-favorite="${product._id}"
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 47.94 47.94"
              xml:space="preserve"
            >
              <path
                d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
          c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
          c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
          c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
          c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
          C22.602,0.567,25.338,0.567,26.285,2.486z
        "
              />
            </svg>
          </button>
        </h1>
        <div class="product-buy">
          <p class="product-price ${product.discountedPrice ? 'active' : ''}">
            <span>
              <span class="price">${product.price}</span>
              <span class="discounted">${product.discountedPrice}</span>
              грн
            </span>
            <span class="text">за упаковку</span>
          </p>
          <button 
            ${product.quantityInDrugstore <= 0 && 'disabled'}
            class="btn ${hasInCart && 'active'}"
            data-to-cart="${product._id}"
          >
            ${hasInCart ? 'В кошику' : 'В кошик'}
          </button>
        </div>
      </div>
    </div>
    <div class="product-info">
      <div class="product-description">${product.description}</div>
      <ul class="product-list">
        <li><span>Виробник:</span> ${product.manufacturer}</li>
        <li><span>Країна виробницва:</span> ${product.manufacturerCountry}</li>
        <li><span>Кількість в аптеці:</span> ${product.quantityInDrugstore}</li>
        <li>
          <span>Кількість на складі:</span> ${product.quantityInWarehouse}
        </li>
        <li>
          <span>Умови відпуску:</span> 
          ${product.withRecipe ? 'За рецептом' : 'Без рецепта'}
        </li>
      </ul>
    </div>
  `
}

;(async () => {
  const { ProductService } = await import('../services/product.js')
  const { addToCart } = await import('./components/add-to-cart.js')
  const { addToFavorite } = await import('./components/add-to-favorite.js')
  const { addToWatched } = await import('./components/add-to-watched.js')
  const { productCard } = await import('./components/product-card.js')

  const DOM = actualDOM()

  try {
    let watchedProducts =
      JSON.parse(localStorage.getItem('watchedProducts')) || []
    const productId = new URLSearchParams(window.location.search).get(
      'productId'
    )
    const responseProduct = await ProductService.getOne({ productId })

    if (!responseProduct.success) return

    if (watchedProducts.length) {
      const responseWatched = await ProductService.getAllWatched({
        productIds: JSON.stringify(watchedProducts),
      })

      if (!responseWatched.success) return

      DOM.watchedProductsSection.classList.add('active')

      const productListHtml = responseWatched.products.map(product => {
        return `
          <div class="swiper-slide">
            ${productCard({ product })}
          </div>
        `
      })

      DOM.watchedProducts.innerHTML = productListHtml.join('')
    }

    if (Object.keys(responseProduct.product).length) {
      const product = responseProduct.product

      DOM.product.innerHTML = productTemplate({ product })

      addToCart()
      addToFavorite()
      addToWatched({ productId: product._id })
    }
  } catch (error) {
    console.log(error)
  }
})()

new Swiper('#watched-swiper', {
  slidesPerView: 4,
  spaceBetween: 20,
})
