;(async () => {
  const { checkAuthService, checkAccessService } = await import(
    '../../services/auth.js'
  )
  const { Fetch } = await import('../../utils/fetch.utility.js')

  checkAuthService()
  checkAccessService()

  const productList = document.querySelector('#product-list')

  const responseProducts = await Fetch({ url: '/api/products', method: 'get' })

  const onRemoveProduct = () => {
    const removeBtns = productList.querySelectorAll('button[data-id]')

    removeBtns.forEach(button => {
      button.addEventListener('click', async e => {
        const response = await Fetch({
          url: `/api/products/${e.target.dataset.id}`,
          method: 'delete',
        })

        if (response.success) {
          window.location.reload()
        }
      })
    })
  }

  const productListHtml = responseProducts.products.map(product => {
    return `
      <div>
        <div>
          <img src="${product.image}" />
          <h6>${product.name}</h6>
          <p>${
            product.availability === 'Так' ? 'В наявності' : 'Немає в наявності'
          }</p>
          <p>Ціна: ${product.price}</p>
          <p>Кількість в аптеці: ${product.quantityInDrugstore}</p>
          <p>Кількість в аптеці: ${product.quantityInWarehouse}</p>
        </div>
        <div>
          <button>Редагувати</button>
          <button data-id="${product._id}">Видалити</button>
        </div>
      </div>
    `
  })

  if (responseProducts.products.length) {
    productList.innerHTML = productListHtml.join('')

    onRemoveProduct()
  } else {
    productList.innerHTML = '<h4>Немає товарів</h4>'
  }
})()
