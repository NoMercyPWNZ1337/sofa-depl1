import { ProductService } from '../../services/product.js'
import { productCard } from '../components/product-card.js'

export const watchedProducts = async ({ DOM }) => {
  let watchedProducts = JSON.parse(localStorage.getItem('watchedProducts')) || []

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
}

new Swiper('#watched-swiper', {
  slidesPerView: 4,
  spaceBetween: 20,
})
