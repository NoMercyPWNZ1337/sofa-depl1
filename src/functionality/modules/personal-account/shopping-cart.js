const actualDOM = () => {
  return {
    shoppingCart: document.querySelector('#shopping-cart'),
    submitOrderBtn: document.querySelector('#submit-order'),
    removeProductBtns: document.querySelectorAll(
      '#shopping-cart .product .btn[data-remove-id]'
    ),
    changeQuantityForms: document.querySelectorAll(
      '#shopping-cart .product form[data-product-id]'
    ),
    amountOrder: document.querySelector('#amount-order'),
    submitOrderBtnWrapper: document.querySelector('#submit-order-wrapper'),
  }
}

const productTemplate = ({ product }) => {
  return `
    <div class="product">
      <img 
        class="product-image"
        src="${product.image}" 
        alt="product image" 
      />
      <a class="product-title" href="/product?productId=${product._id}">
        ${product.name}
      </a>
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
}

;(async () => {
  const { AuthService } = await import('../../services/auth.js')
  const { ProductService } = await import('../../services/product.js')
  const { OrderService } = await import('../../services/order.js')
  const { Redirect } = await import('../../utils/redirect.utillity.js')

  try {
    const responseAuth = await AuthService.checkAuth()

    if (!responseAuth?.success) return
  } catch (error) {
    console.log(error)
  }

  const DOM = actualDOM()

  let productsData = []
  let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || []

  const amountOrder = () => {
    const productPrices = productsData.map(product => {
      return (product.discountedPrice || product.price) * +product.quantity
    })
    const totalPrice = productPrices.reduce((acc, price) => acc + price, 0)

    DOM.amountOrder.innerHTML = `До оплати без доставки: <span>${totalPrice}</span> грн`

    return totalPrice
  }

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
        const productId = form.dataset.productId
        const productIndex = productsData.findIndex(product => {
          return product._id === productId
        })

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

        productsData[productIndex].quantity = form.quantity.value

        amountOrder()
      })
    })
  }

  try {
    const responseProducts = await ProductService.getAllForShoppingCart({
      productIds: JSON.stringify(shoppingCart),
    })

    if (!responseProducts.success) return

    if (responseProducts.products.length) {
      DOM.submitOrderBtnWrapper.classList.add('show')

      productsData = responseProducts.products.map(product => ({
        ...product,
        quantity: 1,
      }))

      const productListHtml = responseProducts.products.map(product => {
        return productTemplate({ product })
      })

      DOM.shoppingCart.innerHTML = productListHtml.join('')

      onRemoveProduct()
      onChangeQuantityProduct()
      amountOrder()
    } else {
      DOM.shoppingCart.innerHTML = `<h3>Товарів в кошику ще немає</h3>`
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

    try {
      const date = new Date()

      const productsInOrder = productsData.map(product => ({
        name: product.name,
        quantity: product.quantity,
        _id: product._id,
        remainingQuantity: product.quantityInDrugstore - product.quantity,
      }))

      const responseOrder = await OrderService.create({
        orderData: {
          userId: responseAuth.user._id,
          amount: amountOrder(),
          products: productsInOrder,
          date: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
        },
      })

      if (responseOrder.success) {
        alert('Дякуємо за замовлення')

        localStorage.removeItem('shoppingCart')

        Redirect('/personal-account/orders-tracking')
      }
    } catch (error) {
      console.log(error)
    }
  })
})()
