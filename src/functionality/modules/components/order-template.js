export const orderTemplate = ({ order }) => {
  const products = order.products.map(product => {
    return `
      <li>
        <a href="">${product.name}</a>
        ${product.quantity} упаков.
      </li>
    `
  })

  return `
    <div class="order">
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
