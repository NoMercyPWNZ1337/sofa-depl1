;(async () => {
  const { AuthService } = await import('../../../services/auth.js')
  const { ProductService } = await import('../../../services/product.js')
  const { Redirect } = await import('../../../utils/redirect.utillity.js')
  const { productTemplate } = await import('../components/product-template.js')

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
    return productTemplate({ product })
  })

  if (responseProducts.products.length) {
    productList.innerHTML = productListHtml.join('')

    readyProductListInDOM()
  } else {
    productList.innerHTML = '<h4>Немає товарів</h4>'
  }
})()
