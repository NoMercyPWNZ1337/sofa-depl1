const actualDOM = () => {
  return {
    toShoppingCartBtns: document.querySelectorAll('button[data-to-cart]'),
    basket: document.querySelector('#basket'),
    basketQuantity: basket.querySelector('#basket-quantity'),
  }
}

export const addToCart = () => {
  const DOM = actualDOM()
  let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || []

  const showShoppingCartQiantity = () => {
    DOM.basketQuantity.innerHTML = shoppingCart.length

    if (shoppingCart.length) {
      DOM.basket.classList.add('active')
    } else {
      DOM.basket.classList.remove('active')
    }
  }

  showShoppingCartQiantity()

  DOM.toShoppingCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
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
