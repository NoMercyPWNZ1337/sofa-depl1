const actualDOM = () => {
  return {
    addProductForm: document.querySelector('#add-product'),
  }
}

;(async () => {
  const { AuthService } = await import('../../../services/auth.js')
  const { ProductService } = await import('../../../services/product.js')
  const { uploadImage } = await import('../components/upload-image.js')
  const { productData } = await import('../components/product-data.js')
  const { underCategorySelect } = await import(
    '../components/under-category-select.js'
  )
  const { productSelect } = await import('../components/product-select.js')

  try {
    const responseAuth = await AuthService.checkAuth()
    if (!responseAuth?.success) return

    const responseAccess = await AuthService.checkAccess()
    if (!responseAccess.success) return
  } catch (error) {
    console.log(error)
  }

  const DOM = actualDOM()
  const previewImage = uploadImage()

  underCategorySelect({ form: DOM.addProductForm })
  productSelect({ form: DOM.addProductForm })

  DOM.addProductForm.addEventListener('submit', async e => {
    e.preventDefault()

    try {
      const responseProduct = await ProductService.create({
        productData: productData({ e, previewImage }),
      })

      if (responseProduct.success) {
        alert(
          'Товар добавлено, сторінка перезагрузиться після закриття сповіщення'
        )

        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  })
})()
