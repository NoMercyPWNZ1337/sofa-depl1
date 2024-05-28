import { ProductService } from '../../../services/product.js'

export const productSelect = async ({
  form,
  productId = null,
  selectedAnalogsIds = [],
}) => {
  const select = form.product

  try {
    const responseProducts = await ProductService.getAll()

    if (responseProducts.success) {
      const products = responseProducts.products.map(product => {
        return {
          ...product,
          selected: selectedAnalogsIds.includes(product._id),
        }
      })

      const productsHtml = products.map(product => {
        if (product._id === productId) return

        return `
          <option value="${product._id}" ${product.selected ? 'selected' : ''}>
            ${product.name}
          </option>
        `
      })

      if (products.length) {
        select.innerHTML = `
          <option value="">Не вибрано</option>
          ${productsHtml.join('')}
        `
      } else {
        select.innerHTML = `<option value="">Товарів ще немає</option>`
      }
    }
  } catch (error) {
    console.log(error)
  }
}
