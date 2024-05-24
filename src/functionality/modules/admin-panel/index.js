;(async () => {
  const { checkAuthService, checkAccessService } = await import(
    '../../services/auth.js'
  )
  const { Fetch } = await import('../../utils/fetch.utility.js')
  const { Redirect } = await import('../../utils/redirect.utillity.js')

  checkAuthService()
  checkAccessService()

  const productList = document.querySelector('#product-list')

  const responseProducts = await Fetch({ url: '/api/products', method: 'get' })

  const onRemoveProduct = () => {
    const removeBtns = productList.querySelectorAll('button[data-remove-id]')

    removeBtns.forEach(button => {
      button.addEventListener('click', async e => {
        const response = await Fetch({
          url: `/api/products/${e.target.dataset.removeId}`,
          method: 'delete',
        })

        if (response.success) {
          window.location.reload()
        }
      })
    })
  }

  const onEditProduct = () => {
    const editBtns = productList.querySelectorAll('button[data-edit-id]')

    editBtns.forEach(button => {
      button.addEventListener('click', async e => {
        Redirect(`/admin-panel/edit-product?id=${e.target.dataset.editId}`)
      })
    })
  }

  const readyProductListInDOM = () => {
    onRemoveProduct()
    onEditProduct()
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
          <p>Кількість на складі: ${product.quantityInWarehouse}</p>
        </div>
        <div>
          <button data-edit-id="${product._id}" >Редагувати</button>
          <button data-remove-id="${product._id}">Видалити</button>
        </div>
      </div>
    `
  })

  if (responseProducts.products.length) {
    productList.innerHTML = productListHtml.join('')

    readyProductListInDOM()
  } else {
    productList.innerHTML = '<h4>Немає товарів</h4>'
  }
})()
