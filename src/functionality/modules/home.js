;(async () => {
  const { ProductService } = await import('../services/product.js')
  const { productCard } = await import('./components/product-card.js')
  const { addToCart } = await import('./components/add-to-cart.js')
  const { addToFavorite } = await import('./components/add-to-favorite.js')

  const discountedSection = document.querySelector('#discounted-products')
  const discountedSwiper = discountedSection.querySelector(
    '#discounted-swiper .swiper-wrapper'
  )

  try {
    const responseProducts = await ProductService.getDiscounted()

    if (!responseProducts.success) return

    if (responseProducts.products.length) {
      discountedSection.classList.add('active')

      const productListHtml = responseProducts.products.map(product => {
        return `
          <div class="swiper-slide">
            ${productCard({ product })}
          </div>
        `
      })

      discountedSwiper.innerHTML = productListHtml.join('')

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
})
