;(async () => {
  const { AuthService } = await import('../../services/auth.js')
  const { ProductService } = await import('../../services/product.js')
  const { Redirect } = await import('../../utils/redirect.utillity.js')

  await AuthService.checkAuth()
  await AuthService.checkAccess()

  const productList = document.querySelector('#product-list')

  const responseProducts = await ProductService.getAll()

  const onRemoveProduct = () => {
    const removeBtns = productList.querySelectorAll('button[data-remove-id]')

    removeBtns.forEach(button => {
      button.addEventListener('click', async e => {
        const response = await ProductService.remove({
          productId: e.target.dataset.removeId,
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
