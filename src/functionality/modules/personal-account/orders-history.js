const actualDOM = () => {
  return {
    ordersHistory: document.querySelector('#orders-history'),
  }
}

;(async () => {
  const { AuthService } = await import('../../services/auth.js')
  const { OrderService } = await import('../../services/order.js')
  const { orderTemplate } = await import('../components/order-template.js')

  const DOM = actualDOM()

  try {
    const responseAuth = await AuthService.checkAuth()

    if (!responseAuth?.success) return

    const responseOrder = await OrderService.getAllNotActive({
      userId: responseAuth.user._id,
    })

    if (!responseOrder.success) return

    if (responseOrder.orders.length) {
      const orderListHtml = responseOrder.orders.reverse().map(order => {
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
