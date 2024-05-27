import { ProductService } from '../../services/product.js'
import { Redirect } from '../../utils/redirect.utillity.js'

export const searchProduct = async () => {
  const wraperSearchForm = document.querySelector('#search')
  const showSearchFormBtn = wraperSearchForm.querySelector('#search-trigger')
  const searchProductList = wraperSearchForm.querySelector('#product-list')
  const searchAnalogList = wraperSearchForm.querySelector('#analog-list')
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
        searchProductList.innerHTML = ''
        searchProductList.classList.remove('active')

        return
      }

      const responseProducts = await ProductService.search({ search })

      if (!responseProducts.success) return

      if (responseProducts.products.length) {
        const renderProductListHtml = ({ products }) => {
          return products.map(product => {
            return `
              <li>
                <a 
                  class="search-link ${
                    !!product.discountedPrice && 'discounted'
                  }" 
                  href="/products/${product._id}"
                  >
                  <span class="title">${product.name}</span>
                  <span class="manufacturer">Виробник: ${
                    product.manufacturer
                  }</span>
                  <span class="price">
                    Ціна: 
                    <span>${product.price} грн</span>
                  </span>
                  ${
                    product.discountedPrice
                      ? `
                        <span class="price-discounted">
                          Ціна зі знижкою: 
                          <span>${product.discountedPrice} грн</span>
                        </span>
                      `
                      : ''
                  }
                </a>
              </li>
            `
          })
        }

        const productListHtml = renderProductListHtml({
          products: responseProducts.products,
        }).join('')

        const analogListHtml = renderProductListHtml({
          products: responseProducts.analogProducts,
        }).join('')

        if (responseProducts.analogProducts.length) {
          searchAnalogList.innerHTML = `
            <h4>Аналогічні товари: </h4>
            ${analogListHtml}
          `

          searchAnalogList.classList.add('active')
        }

        searchProductList.innerHTML = productListHtml
        searchProductList.classList.add('active')
      } else {
        searchProductList.innerHTML = '<h3>Нічого не знайдено</h3>'
        searchProductList.classList.add('active')
      }

      if (!responseProducts.analogProducts.length) {
        searchAnalogList.innerHTML = '<h3>Нічого не знайдено</h3>'
        searchAnalogList.classList.remove('active')
      }
    })
  } catch (error) {
    console.log(error)
  }
}
