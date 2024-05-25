import { CategoryService } from '../../../services/category.js'

export const categorySelect = async ({ form }) => {
  const select = form.category

  try {
    const responseCategories = await CategoryService.getAll()

    if (responseCategories.success) {
      const categories = responseCategories.categories.map(category => {
        return `<option value="${category._id}">${category.name}</option>`
      })

      select.innerHTML = `
        <option value="">Виберіть категорію</option>
        ${categories}
      `
    }
  } catch (error) {
    console.log(error)
  }
}
