const actualDOM = () => {
  return {
    productList: document.querySelector('#products'),
    submitOrderBtn: document.querySelector('#submit-order'),
    removeProductBtns: document.querySelectorAll(
      '#products .product .btn[data-remove-id]'
    ),
    changeQuantityForms: document.querySelectorAll(
      '#products .product form[data-product-id]'
    ),
  }
}

;(async () => {
  const { AuthService } = await import('../../services/auth.js')
  const { ProductService } = await import('../../services/product.js')

  await AuthService.checkAuth()

  const DOM = actualDOM()

  let productsData = []
  let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || []

  const onRemoveProduct = () => {
    const removeBtns = actualDOM().removeProductBtns

    removeBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        const productId = e.target.dataset.removeId

        shoppingCart = shoppingCart.filter(id => id !== productId)

        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))

        window.location.reload()
      })
    })
  }

  const onChangeQuantityProduct = () => {
    const quantityForms = actualDOM().changeQuantityForms

    quantityForms.forEach(form => {
      form.addEventListener('click', e => {
        e.preventDefault()

        const maxQuantity = +form.dataset.max

        if (e.target.name === 'plus') {
          if (form.quantity.value >= maxQuantity) {
            alert(`В продавця в наявності є тільки - ${maxQuantity}`)

            return
          }

          form.quantity.value++
        }
        if (e.target.name === 'minus') {
          if (form.quantity.value <= 1) return

          form.quantity.value--
        }
      })
    })
  }

  try {
    const responseProducts = await ProductService.getAllForShoppingCart({
      productIds: JSON.stringify(shoppingCart),
    })

    if (!responseProducts.success) return

    if (responseProducts.products.length) {
      productsData = responseProducts.products

      const productListHtml = responseProducts.products.map(product => {
        return `
          <div class="product">
            <img 
              class="product-image"
              src="${product.image}" 
              alt="product image" 
            />
            <a class="product-title" href="">${product.name}</a>
            <p class="product-stock">
              В наявності: ${product.quantityInDrugstore}
            </p>
            <p class="product-price ${product.discountedPrice ? 'active' : ''}">
              <span>
                <span class="price">${product.price}</span>
                ${
                  product.discountedPrice &&
                  `<span class="discounted">
                    ${product.discountedPrice}
                  </span>`
                }
                грн
              </span>
              <span class="text">за упаковку</span>
            </p>
            <form 
                class="product-quantity" 
                data-product-id="${product._id}"
                data-max="${product.quantityInDrugstore}"
              >
              <button class="btn" name="minus">-</button>
              <input
                disabled
                value="1"
                name="quantity"
                class="form-input" 
              />
              <button class="btn" name="plus">+</button>
            </form>
            <button class="btn" data-remove-id="${product._id}">
              Видалити
            </button>
          </div>
        `
      })

      DOM.productList.innerHTML = productListHtml.join('')

      onRemoveProduct()
      onChangeQuantityProduct()
    }
  } catch (error) {
    console.log(error)
  }

  DOM.submitOrderBtn.addEventListener('click', async () => {
    const address = prompt('Введіть адресу куди доставити замовлення')

    if (!address.length) {
      alert('Ви не ввели адресу')

      return
    }
  })
})()
