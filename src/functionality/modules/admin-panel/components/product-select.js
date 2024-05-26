import { ProductService } from '../../../services/product.js'

export const productSelect = async ({
  form,
  productId = null,
  selectedAnalogs = [],
}) => {
  const select = form.product

  try {
    const responseProducts = await ProductService.getAll()

    if (responseProducts.success) {
      const products = responseProducts.products.reduce((acc, product) => {
        if (selectedAnalogs.length) {
          selectedAnalogs.forEach(analogId => {
            acc.push({ ...product, selected: analogId === product._id })
          })
        } else {
          acc = responseProducts.products
        }

        return acc
      }, [])

      const productsHtml = products.map(product => {
        if (product._id === productId) return

        return `
          <option value="${product._id}" ${product.selected ? 'selected' : ''}>
            ${product.name}
          </option>
        `
      })

      console.log(responseProducts.products)

      if (products.length) {
        select.innerHTML = `
          <option>Виберіть аналогічний товар</option>
          ${productsHtml.join('')}
        `
      } else {
        select.innerHTML = `<option>Товарів ще немає</option>`
      }
    }
  } catch (error) {
    console.log(error)
  }
}
