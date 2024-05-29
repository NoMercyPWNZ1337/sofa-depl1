export const addToCart = () => {
  const toShoppingCartBtns = document.querySelectorAll('button[data-to-cart]')
  const basket = document.querySelector('#basket')
  const basketQuantity = basket.querySelector('#basket-quantity')

  let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || []

  const showShoppingCartQiantity = () => {
    basketQuantity.innerHTML = shoppingCart.length

    if (shoppingCart.length) {
      basket.classList.add('active')
    } else {
      basket.classList.remove('active')
    }
  }

  showShoppingCartQiantity()

  toShoppingCartBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      const productId = btn.dataset.toCart

      if (!shoppingCart.includes(productId)) {
        shoppingCart.push(productId)

        btn.innerHTML = 'В кошику'
        btn.classList.add('active')
        showShoppingCartQiantity()
      } else {
        shoppingCart = shoppingCart.filter(id => id !== productId)

        btn.innerHTML = 'В кошик'
        btn.classList.remove('active')
        showShoppingCartQiantity()
      }

      localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
    })
  })
}
