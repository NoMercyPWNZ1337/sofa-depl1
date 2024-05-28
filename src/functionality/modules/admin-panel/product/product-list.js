;(async () => {
  const { AuthService } = await import('../../../services/auth.js')
  const { ProductService } = await import('../../../services/product.js')
  const { Redirect } = await import('../../../utils/redirect.utillity.js')
  const { productCard } = await import('../components/product-card.js')

  await AuthService.checkAuth()
  await AuthService.checkAccess()

  const productList = document.querySelector('#product-list')

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

  try {
    const responseProducts = await ProductService.getAll()

    if (!responseProducts.success) return

    if (responseProducts.products.length) {
      const productListHtml = responseProducts.products.map(product => {
        return productCard({ product })
      })

      productList.innerHTML = productListHtml.join('')

      onRemoveProduct()
      onEditProduct()
    } else {
      productList.innerHTML = '<h4>Немає товарів</h4>'
    }
  } catch (error) {
    console.log(error)
  }
})()
