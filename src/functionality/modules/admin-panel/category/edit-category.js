;(async () => {
  const { AuthService } = await import('../../../services/auth.js')
  const { CategoryService } = await import('../../../services/category.js')

  await AuthService.checkAuth()
  await AuthService.checkAccess()

  const categoryId = new URLSearchParams(window.location.search).get('id')
  const editCategoryForm = document.querySelector('#edit-category')

  const { category } = await CategoryService.getOne({ categoryId })

  if (Object.keys(category).length) {
    editCategoryForm.name.value = category.name
  }

  editCategoryForm.addEventListener('submit', async e => {
    e.preventDefault()

    try {
      const response = await CategoryService.update({
        categoryData: { name: e.target.name.value },
        categoryId,
      })

      if (response.success) {
        alert('Категорію оновлено')
      }
    } catch (error) {
      console.log(error)
    }
  })
})()
