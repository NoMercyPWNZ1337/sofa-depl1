const actualDOM = () => {
  return {
    editCategoryForm: document.querySelector('#edit-category'),
  }
}

;(async () => {
  const { AuthService } = await import('../../../services/auth.js')
  const { CategoryService } = await import('../../../services/category.js')

  await AuthService.checkAuth()
  await AuthService.checkAccess()

  const DOM = actualDOM()
  const categoryId = new URLSearchParams(window.location.search).get('id')

  try {
    const responseCategory = await CategoryService.getOne({ categoryId })

    if (Object.keys(responseCategory.category).length) {
      DOM.editCategoryForm.name.value = responseCategory.category.name
    }
  } catch (error) {
    console.log(error)
  }

  DOM.editCategoryForm.addEventListener('submit', async e => {
    e.preventDefault()

    try {
      const responseCategoryUpdate = await CategoryService.update({
        categoryData: { name: e.target.name.value },
        categoryId,
      })

      if (responseCategoryUpdate.success) {
        alert('Категорію оновлено')
      }
    } catch (error) {
      console.log(error)
    }
  })
})()
