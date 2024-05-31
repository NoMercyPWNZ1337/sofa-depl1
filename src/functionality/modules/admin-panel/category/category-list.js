const actualDOM = () => {
  return {
    categoryList: document.querySelector('#category-list'),
    removeCategoryBtns: document.querySelectorAll(
      '#category-list button[data-remove-id]'
    ),
    editCategoryBtns: document.querySelectorAll(
      '#category-list button[data-edit-id]'
    ),
  }
}

;(async () => {
  const { AuthService } = await import('../../../services/auth.js')
  const { CategoryService } = await import('../../../services/category.js')
  const { Redirect } = await import('../../../utils/redirect.utillity.js')

  await AuthService.checkAuth()
  await AuthService.checkAccess()

  const DOM = actualDOM()

  const onRemoveCategory = () => {
    const removeBtns = actualDOM().removeCategoryBtns

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
    const editBtns = actualDOM().editCategoryBtns

    editBtns.forEach(button => {
      button.addEventListener('click', async e => {
        Redirect(`/admin-panel/edit-category?id=${e.target.dataset.editId}`)
      })
    })
  }

  try {
    const responseCategories = await CategoryService.getAll()

    if (!responseCategories.success) return

    if (responseCategories.categories.length) {
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

      DOM.categoryList.innerHTML = categoryListHtml.join('')

      onRemoveCategory()
      onEditCategory()
    } else {
      DOM.categoryList.innerHTML = '<h4>Немає категорій</h4>'
    }
  } catch (error) {
    console.log(error)
  }
})()
