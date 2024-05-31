const actualDOM = () => {
  return {
    addCategoryForm: document.querySelector('#add-category'),
  }
}

;(async () => {
  const { AuthService } = await import('../../../services/auth.js')
  const { CategoryService } = await import('../../../services/category.js')

  await AuthService.checkAuth()
  await AuthService.checkAccess()

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
