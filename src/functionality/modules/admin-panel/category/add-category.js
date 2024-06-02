const actualDOM = () => {
  return {
    addCategoryForm: document.querySelector('#add-category'),
  }
}

;(async () => {
  const { AuthService } = await import('../../../services/auth.js')
  const { CategoryService } = await import('../../../services/category.js')

  try {
    const responseAuth = await AuthService.checkAuth()
    if (!responseAuth?.success) return

    const responseAccess = await AuthService.checkAccess()
    if (!responseAccess.success) return
  } catch (error) {
    console.log(error)
  }

  const DOM = actualDOM()

  DOM.addCategoryForm.addEventListener('submit', async e => {
    e.preventDefault()

    try {
      const responseCategory = await CategoryService.create({
        catagoryData: { name: e.target.name.value },
      })

      if (responseCategory.success) {
        alert(
          'Категорію добавлено, сторінка перезагрузиться після закриття сповіщення'
        )

        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  })
})()
