;(async () => {
  const { AuthService } = await import('../../../services/auth.js')
  const { UnderCategoryService } = await import(
    '../../../services/under-category.js'
  )
  const { categorySelect } = await import('../components/category-select.js')

  await AuthService.checkAuth()
  await AuthService.checkAccess()

  const underCategoryId = new URLSearchParams(window.location.search).get('id')
  const editUnderCategoryForm = document.querySelector('#edit-under-category')

  try {
    const responseUnderCategory = await UnderCategoryService.getOne({
      underCategoryId,
    })

    if (Object.keys(responseUnderCategory.underCategory).length) {
      const underCategory = responseUnderCategory.underCategory

      editUnderCategoryForm.name.value = underCategory.name
      editUnderCategoryForm.category.value = underCategory.categoryId

      categorySelect({
        form: editUnderCategoryForm,
        selectedCategoryId: underCategory.categoryId,
      })
    }
  } catch (error) {
    console.log(error)
  }

  editUnderCategoryForm.addEventListener('submit', async e => {
    e.preventDefault()

    try {
      const response = await UnderCategoryService.update({
        underCatagoryData: {
          name: e.target.name.value,
          categoryId: e.target.category.value,
        },
        underCategoryId,
      })

      if (response.success) {
        alert('Підкатегорію оновлено')
      }
    } catch (error) {
      console.log(error)
    }
  })
})()
