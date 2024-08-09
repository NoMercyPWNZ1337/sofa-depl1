import { ProductService } from '../../services/product.js'
import { Redirect } from '../../utils/redirect.utillity.js'

const actualDOM = () => {
  return {
    wraperSearchForm: document.querySelector('#search'),
    showSearchFormBtn: document.querySelector('#search #search-trigger'),
    searchProductList: document.querySelector('#search #product-list'),
    searchAnalogList: document.querySelector('#search #analog-list'),
    searchForm: document.querySelector('#search #search-form'),
    searchBgForHideForm: document.querySelector('#search #search-bg'),
  }
}


{/* <span class="link-manufacturer">
Виробник: ${product.manufacturer}
</span> */}
const productTemplate = ({ product }) => {
  return `
    <li>
    
      <a 
        class="
          search-link
          ${!!product.discountedPrice && 'discounted'}
        "
        href="/product?productId=${product._id}"
      >
      <img src="${product.image}">
        <span class="link-title">${product.name}</span>
       
        <span class="link-price">
          Ціна: 
          <span>${product.price} грн</span>
        </span>
        ${
          product.discountedPrice
            ? `
              <span class="link-price-discounted">
                Ціна зі знижкою: 
                <span>${product.discountedPrice} грн</span>
              </span>
            `
            : ''
        }
      </a>
    </li>
  `
}

export const searchProduct = async () => {
  const DOM = actualDOM()
  const searchInput = DOM.searchForm.search

  DOM.showSearchFormBtn.addEventListener('click', () => {
    document.body.style.overflow = 'hidden'
    DOM.wraperSearchForm.classList.add('active')
    searchInput.focus()
  })

    // DOM.showSearchFormBtnMobile.addEventListener('click', () => {
  //   document.body.style.overflow = 'hidden'
  //   DOM.wraperSearchForm.classList.add('active')
  //   searchInput.focus()
  // })

  DOM.searchBgForHideForm.addEventListener('click', () => {
    DOM.wraperSearchForm.classList.remove('active')
    document.body.style.overflow = ''
  })

  DOM.searchForm.addEventListener('submit', e => {
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
        DOM.searchProductList.innerHTML = ''
        DOM.searchAnalogList.innerHTML = '<h3>Нічого не знайдено</h3>'

        DOM.searchProductList.classList.remove('active')
        DOM.searchAnalogList.classList.remove('active')

        return
      }

      const responseProducts = await ProductService.search({ search })

      if (!responseProducts.success) return

      if (responseProducts.products.length) {
        const renderProductListHtml = ({ products }) => {
          return products.map(product => {
            return productTemplate({ product })
          })
        }

        const productListHtml = renderProductListHtml({
          products: responseProducts.products,
        }).join('')

        const analogListHtml = renderProductListHtml({
          products: responseProducts.analogProducts,
        }).join('')

        if (responseProducts.analogProducts.length) {
          DOM.searchAnalogList.innerHTML = `
            <h4>Товари аналогічні дії: </h4>
            ${analogListHtml}
          `

          DOM.searchAnalogList.classList.add('active')
        }

        DOM.searchProductList.innerHTML = productListHtml
        DOM.searchProductList.classList.add('active')
      } else {
        DOM.searchProductList.innerHTML = '<h3>Нічого не знайдено</h3>'
        DOM.searchProductList.classList.add('active')
      }

      if (!responseProducts.analogProducts.length) {
        DOM.searchAnalogList.innerHTML = '<h3>Нічого не знайдено</h3>'
        DOM.searchAnalogList.classList.remove('active')
      }
    })
  } catch (error) {
    console.log(error)
  }
}
