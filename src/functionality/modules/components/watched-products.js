import { ProductService } from '../../services/product.js'
import { productCard } from '../components/product-card.js'
import { addToCart } from '../components/add-to-cart.js'
import { addToFavorite } from '../components/add-to-favorite.js'

export const watchedProducts = async ({ DOM }) => {
  let watchedProducts =
    JSON.parse(localStorage.getItem('watchedProducts')) || []

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

    addToCart()
    addToFavorite()
  }

  new Swiper('#watched-swiper', {
    slidesPerView: 4,
    spaceBetween: 20,
    breakpoints: {
      320: {
        slidesPerView: 1.2,
        spaceBetween: 10,
      },
      350: {
        slidesPerView: 1.3,
        spaceBetween: 10,
      },
      600: {
        slidesPerView: 1.7,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
      },
      930: {
        slidesPerView: 3,
      },
      1240: {
        slidesPerView: 4,
      },
    },
  })
}
