import { CategoryService } from '../../../services/category.js'

export const categorySelect = async ({ form, selectedCategoryId }) => {
  const select = form.category

  try {
    const responseCategories = await CategoryService.getAll()

    if (responseCategories.success) {
      const categoriesHtml = responseCategories.categories.map(category => {
        return `
          <option value="${category._id}" ${
          selectedCategoryId === category._id ? 'selected' : ''
        }>
          ${category.name}
        </option>`
      })

      select.innerHTML = `
        <option value="">Виберіть категорію</option>
        ${categoriesHtml.join('')}
      `
    }
  } catch (error) {
    console.log(error)
  }
}
