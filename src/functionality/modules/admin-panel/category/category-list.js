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

const categoryTemplate = ({ category }) => {
  return `
    <div class="list-item">
      <a href="/admin-panel/edit-category?categoryId=${category._id}">
        ${category.name}
      </a>
      <button class="btn" data-remove-id="${category._id}">Видалити</button>
    </div>
  `
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

  try {
    const responseCategories = await CategoryService.getAll()

    if (!responseCategories.success) return

    if (responseCategories.categories.length) {
      const categoryListHtml = responseCategories.categories.map(category => {
        return categoryTemplate({ category })
      })

      DOM.categoryList.innerHTML = categoryListHtml.join('')

      onRemoveCategory()
    } else {
      DOM.categoryList.innerHTML = '<h4>Немає категорій</h4>'
    }
  } catch (error) {
    console.log(error)
  }
})()
