;(async () => {
  const { AuthService } = await import('../../../services/auth.js')
  const { CategoryService } = await import('../../../services/category.js')
  const { Redirect } = await import('../../../utils/redirect.utillity.js')

  await AuthService.checkAuth()
  await AuthService.checkAccess()

  const categoryList = document.querySelector('#category-list')

  const responseCategories = await CategoryService.getAll()

  const onRemoveCategory = () => {
    const removeBtns = categoryList.querySelectorAll('button[data-remove-id]')

    removeBtns.forEach(button => {
      button.addEventListener('click', async e => {
        const response = await CategoryService.remove({
          categoryId: e.target.dataset.removeId,
        })

        if (response.success) {
          window.location.reload()
        }
      })
    })
  }

  const onEditCategory = () => {
    const editBtns = categoryList.querySelectorAll('button[data-edit-id]')

    editBtns.forEach(button => {
      button.addEventListener('click', async e => {
        Redirect(`/admin-panel/edit-category?id=${e.target.dataset.editId}`)
      })
    })
  }

  const readyCategoryListInDOM = () => {
    onRemoveCategory()
    onEditCategory()
  }

  const categoryListHtml = responseCategories.categories.map(category => {
    return `
        <div>
          <div>
            <h6>${category.name}</h6>
          </div>
          <div>
            <button data-edit-id="${category._id}" >Редагувати</button>
            <button data-remove-id="${category._id}">Видалити</button>
          </div>
        </div>
      `
  })

  if (responseCategories.categories.length) {
    categoryList.innerHTML = categoryListHtml.join('')

    readyCategoryListInDOM()
  } else {
    categoryList.innerHTML = '<h4>Немає категорій</h4>'
  }
})()
