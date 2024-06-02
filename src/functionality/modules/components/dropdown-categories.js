import { UnderCategoryService } from '../../services/under-category.js'

const actualDOM = () => {
  return {
    dropdownList: document.querySelector('#dropdown #dropdown-list'),
  }
}

export const dropdownCategories = async () => {
  const DOM = actualDOM()

  try {
    const responseCategories = await UnderCategoryService.getAllWithCategories()

    if (!responseCategories.success) return

    if (responseCategories.categories.length) {
      const dropdownListHtml = responseCategories.categories.map(category => {
        const underDropdownListHtml = category.underCategories.map(
          underCategory => {
            return `
              <li class="underlist-item">
                <a href="/catalog?underCategoryId=${underCategory._id}" class="list-link">
                  ${underCategory.name}
                </a>
              </li>
            `
          }
        )

        return `
          <li class="list-item">
            <a href="/catalog?categoryId=${category._id}" 
              class="list-link"
            >
              ${category.name}
            </a>

            <ul class="dropdown-underlist">
              ${underDropdownListHtml.join('')}
            </ul>
          </li>
        `
      })

      DOM.dropdownList.innerHTML = dropdownListHtml.join('')
    }
  } catch (error) {
    console.log(error)
  }
}
