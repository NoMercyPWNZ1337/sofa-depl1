const actualDOM = () => {
  return {
    addUnderCategoryForm: document.querySelector('#add-under-category'),
  }
}

;(async () => {
  const { AuthService } = await import('../../../services/auth.js')
  const { categorySelect } = await import('../components/category-select.js')
  const { UnderCategoryService } = await import(
    '../../../services/under-category.js'
  )

  try {
    const responseAuth = await AuthService.checkAuth()
    if (!responseAuth?.success) return

    const responseAccess = await AuthService.checkAccess()
    if (!responseAccess.success) return
  } catch (error) {
    console.log(error)
  }

  const DOM = actualDOM()

  categorySelect({ form: DOM.addUnderCategoryForm })

  DOM.addUnderCategoryForm.addEventListener('submit', async e => {
    e.preventDefault()

    try {
      const responseUnderCategory = await UnderCategoryService.create({
        underCatagoryData: {
          name: e.target.name.value,
          categoryId: e.target.category.value,
        },
      })

      if (responseUnderCategory.success) {
        alert(
          'Підкатегорію добавлено, сторінка перезагрузиться після закриття сповіщення'
        )

        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  })
})()
