export const orderTemplate = ({ order }) => {
  const products = order.products.map(product => {
    return `
      <li>
        <a href="/product?productId=${product._id}">${product.name}</a>
        ${product.quantity} упаков.
      </li>
    `
  })

  return `
    <div class="order">
      <ul class="order-products">
        <li class="order-date">${order.date}</li>
        ${products.join('')}
        <li class="order-address">Адреса: ${order.address}</li>
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
