const actualDOM = () => {
  return {
    ordersHistory: document.querySelector('#orders-history'),
  }
}

const orderTemplate = ({ order }) => {
  const products = order.products.map(product => {
    return `
      <li>
        <a href="">${product.name}</a>
        ${product.quantity} упаков.
      </li>
    `
  })

  return `
    <div class="order history">
      <ul class="order-products">
        ${products.join('')}
      </ul>
      <ul class="order-info">
        <li 
          class="order-status ${order.status === 'Скасовано' && 'active'}"
        >
          ${order.status}
        </li>
        <li class="order-price">
          Вартість: <span>${order.amount}</span> грн
        </li>
      </ul>
    </div>
  `
}

;(async () => {
  const { AuthService } = await import('../../services/auth.js')
  const { OrderService } = await import('../../services/order.js')

  const DOM = actualDOM()

  try {
    const responseAuth = await AuthService.checkAuth()

    if (!responseAuth.success) return

    const responseOrder = await OrderService.getAllNotActive({
      userId: responseAuth.user._id,
    })

    if (!responseOrder.success) return

    if (responseOrder.orders.length) {
      const orderListHtml = responseOrder.orders.map(order => {
        return orderTemplate({ order })
      })

      DOM.ordersHistory.innerHTML = orderListHtml.join('')
    } else {
      DOM.ordersHistory.innerHTML = `<h2>Замовлень поки що не було</h2>`
    }
  } catch (error) {
    console.log(error)
  }
})()
