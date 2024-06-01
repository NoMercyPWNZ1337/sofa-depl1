import { CategoryService } from '../../../services/category.js'

const categoryOptionTemplate = ({ category, selectedCategoryId }) => {
  return `
    <option 
      value="${category._id}" 
      ${selectedCategoryId === category._id ? 'selected' : ''}
    >
      ${category.name}
    </option>
  `
}

export const categorySelect = async ({ form, selectedCategoryId }) => {
  const select = form.category

  try {
    const responseCategories = await CategoryService.getAll()

    if (!responseCategories.success) return

    if (responseCategories.categories.length) {
      const categoriesHtml = responseCategories.categories.map(category => {
        return categoryOptionTemplate({ category, selectedCategoryId })
      })

      select.innerHTML = `
        <option value="">Не вибрано</option>
        ${categoriesHtml.join('')}
      `
    } else {
      select.innerHTML = `
       <option value="">Немає категорій</option>
      `
    }
  } catch (error) {
    console.log(error)
  }
}
