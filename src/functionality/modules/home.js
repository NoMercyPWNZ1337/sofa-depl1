;(async () => {
  const { ProductService } = await import('../services/product.js')
  const { productCard } = await import('./components/product-card.js')

  const discountedSection = document.querySelector('#discounted-products')
  const discountedSwiper = discountedSection.querySelector(
    '#discounted-swiper .swiper-wrapper'
  )

  console.log(discountedSwiper)
  try {
    const responseProducts = await ProductService.getDiscounted()

    if (!responseProducts.success) return

    if (responseProducts.productsDiscounted.length) {
      discountedSection.classList.add('active')

      const productsDiscountedHtml = responseProducts.productsDiscounted.map(
        product => {
          return `
            <div class="swiper-slide">
              ${productCard({ product })}
            </div>
          `
        }
      )

      discountedSwiper.innerHTML = productsDiscountedHtml.join('')
    }

    console.log(responseProducts.productsDiscounted)
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
  autoplay: {
    delay: 3000,
  },
  slidesPerView: 4,
  // loop: true,
  spaceBetween: 20,
})
