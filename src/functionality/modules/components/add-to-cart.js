export const addToCart = () => {
  const toCartBtns = document.querySelectorAll('button[data-to-cart]')
  const basket = document.querySelector('#basket')
  const basketQuantity = basket.querySelector('#basket-quantity')

  let shopingCart = JSON.parse(localStorage.getItem('shopingCart')) || []

  const hasViewCartQuantity = () => {
    basketQuantity.innerHTML = shopingCart.length

    if (shopingCart.length) {
      basket.classList.add('active')
    } else {
      basket.classList.remove('active')
    }
  }

  hasViewCartQuantity()

  toCartBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      const productId = e.target.dataset.toCart

      if (shopingCart) {
        if (!shopingCart.includes(productId)) {
          shopingCart.push(productId)

          btn.innerHTML = 'В кошику'
          btn.classList.add('active')
          hasViewCartQuantity()
        } else {
          shopingCart = shopingCart.filter(id => id !== productId)

          btn.innerHTML = 'В кошик'
          btn.classList.remove('active')
          hasViewCartQuantity()
        }
      }

      localStorage.setItem('shopingCart', JSON.stringify(shopingCart))
    })
  })
}
