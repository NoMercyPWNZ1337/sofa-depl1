import { ProductService } from '../../services/product.js'
import { Redirect } from '../../utils/redirect.utillity.js'

export const searchProduct = async () => {
  const wraperSearchForm = document.querySelector('#search')
  const showSearchFormBtn = wraperSearchForm.querySelector('#search-trigger')
  const searchList = wraperSearchForm.querySelector('#search-list')
  const searchForm = wraperSearchForm.querySelector('#search-form')
  const searchBgForHideForm = wraperSearchForm.querySelector('#search-bg')
  const searchInput = searchForm.search

  showSearchFormBtn.addEventListener('click', () => {
    wraperSearchForm.classList.add('active')
    searchInput.focus()
  })

  searchBgForHideForm.addEventListener('click', () => {
    wraperSearchForm.classList.remove('active')
  })

  searchForm.addEventListener('submit', e => {
    const search = e.target.search.value

    e.preventDefault()

    if (search.length >= 3) {
      Redirect(`/search-result/search=${search}`)
    }
  })

  try {
    searchInput.addEventListener('input', async e => {
      const search = e.target.value

      if (search.length < 3) {
        searchList.innerHTML = ''
        searchList.classList.remove('active')

        return
      }

      const responseProducts = await ProductService.search({ search })

      if (!responseProducts.success) return

      if (responseProducts.products.length) {
        const productListHtml = responseProducts.products.map(product => {
          return `
            <li>
              <a href="/products/${product._id}">${product.name}</a>
            </li>
          `
        })

        searchList.innerHTML = productListHtml.join('')
        searchList.classList.add('active')
      } else {
        searchList.innerHTML = '<h3>Нічого не знайдено</h3>'
        searchList.classList.add('active')
      }
    })
  } catch (error) {
    console.log(error)
  }
}
