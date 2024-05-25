;(async () => {
  const { AuthService } = await import('../../../services/auth.js')
  const { CategoryService } = await import('../../../services/category.js')

  await AuthService.checkAuth()
  await AuthService.checkAccess()

  const addCategoryForm = document.querySelector('#add-category')

  addCategoryForm.addEventListener('submit', async e => {
    e.preventDefault()

    try {
      const response = await CategoryService.create({
        catagoryData: { name: e.target.name.value },
      })

      if (response.success) {
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
