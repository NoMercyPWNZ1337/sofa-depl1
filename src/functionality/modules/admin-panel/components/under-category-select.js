import { UnderCategoryService } from '../../../services/under-category.js'

export const underCategorySelect = async ({
  form,
  selectedUnderCategoryId,
}) => {
  const select = form.underCategory

  try {
    const responseUnderCategories = await UnderCategoryService.getAll()

    if (!responseUnderCategories.success) return

    if (responseUnderCategories.underCategories.length) {
      const underCategoriesHtml = responseUnderCategories.underCategories.map(
        underCategory => {
          return `
            <option 
              value="${category._id}" 
              ${selectedUnderCategoryId === underCategory._id ? 'selected' : ''}
            >
              ${underCategory.name}
            </option>
          `
        }
      )

      select.innerHTML = `
        <option value="">Не вибрано</option>
        ${underCategoriesHtml.join('')}
      `
    } else {
      select.innerHTML = `
        <option value="">Немає підкатегорій</option>
      `
    }
  } catch (error) {
    console.log(error)
  }
}
