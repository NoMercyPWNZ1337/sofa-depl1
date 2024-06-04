const actualDOM = () => {
  return {
    editUnderCategoryForm: document.querySelector('#edit-under-category'),
  }
}

;(async () => {
  const { AuthService } = await import('../../../services/auth.js')
  const { UnderCategoryService } = await import(
    '../../../services/under-category.js'
  )
  const { categorySelect } = await import('../components/category-select.js')

  try {
    const responseAuth = await AuthService.checkAuth()
    if (!responseAuth?.success) return

    const responseAccess = await AuthService.checkAccess()
    if (!responseAccess.success) return
  } catch (error) {
    console.log(error)
  }

  const DOM = actualDOM()
  const underCategoryId = new URLSearchParams(window.location.search).get(
    'underCategoryId'
  )

  try {
    const responseUnderCategory = await UnderCategoryService.getOne({
      underCategoryId,
    })

    if (Object.keys(responseUnderCategory.underCategory).length) {
      const underCategory = responseUnderCategory.underCategory

      DOM.editUnderCategoryForm.name.value = underCategory.name
      DOM.editUnderCategoryForm.category.value = underCategory.categoryId

      categorySelect({
        form: DOM.editUnderCategoryForm,
        selectedCategoryId: underCategory.categoryId,
      })
    }
  } catch (error) {
    console.log(error)
  }

  DOM.editUnderCategoryForm.addEventListener('submit', async e => {
    e.preventDefault()

    try {
      const responseUnderCategoryUpdate = await UnderCategoryService.update({
        underCatagoryData: {
          name: e.target.name.value,
          categoryId: e.target.category.value,
        },
        underCategoryId,
      })

      if (responseUnderCategoryUpdate.success) {
        alert('Підкатегорію оновлено')
      }
    } catch (error) {
      console.log(error)
    }
  })
})()
