const actualDOM = () => {
  return {
    discountedSection: document.querySelector('#discounted-products'),
    discountedSwiper: document.querySelector(
      '#discounted-products #discounted-swiper .swiper-wrapper'
    ),
  }
}

;(async () => {
  const { ProductService } = await import('../services/product.js')
  const { productCard } = await import('./components/product-card.js')
  const { addToCart } = await import('./components/add-to-cart.js')
  const { addToFavorite } = await import('./components/add-to-favorite.js')

  const DOM = actualDOM()

  try {
    const responseProducts = await ProductService.getDiscounted()

    if (!responseProducts.success) return

    if (responseProducts.products.length) {
      DOM.discountedSection.classList.add('active')

      const productListHtml = responseProducts.products.map(product => {
        return `
          <div class="swiper-slide">
            ${productCard({ product })}
          </div>
        `
      })

      DOM.discountedSwiper.innerHTML = productListHtml.join('')

      addToCart()
      addToFavorite()
    }
  } catch (error) {
    console.log(error)
  }
})()

new Swiper('#home-swiper', {
  autoplay: {
    delay: 3000,
  },
  loop: true,
  spaceBetween: 30,
  navigation: {
    nextEl: '#home-swiper .swiper-button-next',
    prevEl: '#home-swiper .swiper-button-prev',
  },
})

new Swiper('#discounted-swiper', {
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
