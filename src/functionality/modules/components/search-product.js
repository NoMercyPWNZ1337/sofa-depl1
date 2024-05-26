import { ProductService } from '../../services/product.js'
import { Redirect } from '../../utils/redirect.utillity.js'

export const searchProduct = async () => {
  const searchProductForm = document.querySelector('#search-product')
  const searchList = searchProductForm.querySelector('#search-list')

  searchProductForm.search.addEventListener('focus', () => {
    const productsNodeList = searchList.querySelectorAll('li')

    searchProductForm.classList.add('focus')

    if (productsNodeList.length) {
      searchList.classList.add('active')
    }
  })

  searchProductForm.search.addEventListener('focusout', () => {
    searchProductForm.classList.remove('focus')
  })

  searchProductForm.search.addEventListener('input', async e => {
    const text = e.target.value

    try {
      if (text.length < 3) {
        searchList.innerHTML = ''
        searchList.classList.remove('active')

        return
      }

      const responseProducts = await ProductService.search({ text })

      if (!responseProducts.success) return

      if (responseProducts.products.length) {
        const productsListHtml = responseProducts.products
          .map(product => {
            return `
              <li>
                <a href="/product/${product._id}">${product.name}</a>
              </li>
            `
          })
          .join('')

        searchList.innerHTML = productsListHtml

        searchList.classList.add('active')
      } else {
        searchList.innerHTML = `<h3>Нічого не знайдено</h3>`
      }
    } catch (error) {
      console.log(error)
    }
  })

  searchProductForm.addEventListener('submit', e => {
    const text = e.target.search.value

    e.preventDefault()

    if (text.length >= 3) {
      Redirect(`/search-result?text=${text}`)
    }
  })

  document.body.addEventListener('click', e => {
    if (
      searchProductForm &&
      typeof searchProductForm.contains === 'function' &&
      !searchProductForm.contains(e.target)
    ) {
      searchList.classList.remove('active')
    }
  })
}
