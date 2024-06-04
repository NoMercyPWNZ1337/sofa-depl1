export const productTemplate = ({ product }) => {
  return `
    <div class="list-item">
      <a href="/admin-panel/edit-product?productId=${product._id}">
        ${product.name}
      </a>
      <button class="btn" data-remove-id="${product._id}">Видалити</button>
    </div>
  `
}
