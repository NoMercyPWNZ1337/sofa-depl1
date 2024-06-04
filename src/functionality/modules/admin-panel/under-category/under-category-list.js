const actualDOM = () => {
  return {
    underCategoryList: document.querySelector('#under-category-list'),
    removeUnderCategoryBtns: document.querySelectorAll(
      '#under-category-list button[data-remove-id]'
    ),
    editUnderCategoryBtns: document.querySelectorAll(
      '#under-category-list button[data-edit-id]'
    ),
  }
}

const underCategoryTemplate = ({ underCategory }) => {
  return `
    <div class="list-item">
      <a href="/admin-panel/edit-under-category?underCategoryId=${underCategory._id}">
        ${underCategory.name}
      </a>
      <button class="btn" data-remove-id="${underCategory._id}">
        Видалити
      </button>
    </div>
  `
}

;(async () => {
  const { AuthService } = await import('../../../services/auth.js')
  const { UnderCategoryService } = await import(
    '../../../services/under-category.js'
  )
  const { Redirect } = await import('../../../utils/redirect.utillity.js')

  try {
    const responseAuth = await AuthService.checkAuth()
    if (!responseAuth?.success) return

    const responseAccess = await AuthService.checkAccess()
    if (!responseAccess.success) return
  } catch (error) {
    console.log(error)
  }

  const DOM = actualDOM()

  const onRemoveUnderCategory = () => {
    const removeBtns = actualDOM().removeUnderCategoryBtns

    removeBtns.forEach(button => {
      button.addEventListener('click', async e => {
        const response = await UnderCategoryService.remove({
          underCategoryId: e.target.dataset.removeId,
        })

        if (response.success) {
          window.location.reload()
        }
      })
    })
  }

  const onEditUnderCategory = () => {
    const editBtns = actualDOM().editUnderCategoryBtns

    editBtns.forEach(button => {
      button.addEventListener('click', async e => {
        Redirect(
          `/admin-panel/edit-under-category?id=${e.target.dataset.editId}`
        )
      })
    })
  }

  try {
    const responseUnderCategories = await UnderCategoryService.getAll()

    if (!responseUnderCategories.success) return

    if (responseUnderCategories.underCategories.length) {
      const underCategoryListHtml = responseUnderCategories.underCategories.map(
        underCategory => {
          return underCategoryTemplate({ underCategory })
        }
      )

      DOM.underCategoryList.innerHTML = underCategoryListHtml.join('')

      onRemoveUnderCategory()
      onEditUnderCategory()
    } else {
      DOM.underCategoryList.innerHTML = '<h4>Немає підкатегорій</h4>'
    }
  } catch (error) {
    console.log(error)
  }
})()
