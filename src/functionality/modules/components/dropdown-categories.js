import { UnderCategoryService } from '../../services/under-category.js'

export const dropdownCategories = async () => {
  const dropdown = document.querySelector('#dropdown')
  const dropdownList = dropdown.querySelector('#dropdown-list')

  try {
    const responseCategories = await UnderCategoryService.getAllWithCategories()

    if (!responseCategories.success) return

    if (responseCategories.categories.length) {
      const dropdownListHtml = responseCategories.categories.map(category => {
        const underDropdownListHtml = category.underCategories.map(
          underCategory => {
            return `
              <li class="underlist-item">
                <a href="/" class="list-link">${underCategory.name}</a>
              </li>
            `
          }
        )

        return `
          <li class="list-item">
            <a href="/" class="list-link">${category.name}</a>

            <ul class="dropdown-underlist">
              ${underDropdownListHtml.join('')}
            </ul>
          </li>
        `
      })

      dropdownList.innerHTML = dropdownListHtml.join('')
    }
  } catch (error) {
    console.log(error)
  }
}
