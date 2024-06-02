const actualDOM = () => {
  return {
    productList: document.querySelector('#product-list'),
    removeProductBtns: document.querySelectorAll(
      '#product-list button[data-remove-id]'
    ),
    editProductBtns: document.querySelectorAll(
      '#product-list button[data-edit-id]'
    ),
  }
}

;(async () => {
  const { AuthService } = await import('../../../services/auth.js')
  const { ProductService } = await import('../../../services/product.js')
  const { Redirect } = await import('../../../utils/redirect.utillity.js')
  const { productTemplate } = await import('../components/product-template.js')

  try {
    const responseAuth = await AuthService.checkAuth()
    if (!responseAuth?.success) return

    const responseAccess = await AuthService.checkAccess()
    if (!responseAccess.success) return
  } catch (error) {
    console.log(error)
  }

  const DOM = actualDOM()

  const onRemoveProduct = () => {
    const removeBtns = actualDOM().removeProductBtns

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
    const editBtns = actualDOM().editProductBtns

    editBtns.forEach(button => {
      button.addEventListener('click', async e => {
        Redirect(`/admin-panel/edit-product?id=${e.target.dataset.editId}`)
      })
    })
  }

  try {
    const responseProducts = await ProductService.getAll()

    if (!responseProducts.success) return

    if (responseProducts.products.length) {
      const productListHtml = responseProducts.products.map(product => {
        return productTemplate({ product })
      })

      DOM.productList.innerHTML = productListHtml.join('')

      onRemoveProduct()
      onEditProduct()
    } else {
      DOM.productList.innerHTML = '<h4>Немає товарів</h4>'
    }
  } catch (error) {
    console.log(error)
  }
})()
