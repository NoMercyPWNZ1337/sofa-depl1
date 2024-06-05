const actualDOM = () => {
  return {
    editProductForm: document.querySelector('#edit-product'),
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
  const productId = new URLSearchParams(window.location.search).get('productId')

  try {
    const responseProduct = await ProductService.getOne({ productId })

    if (!responseProduct.success) return

    const product = responseProduct.product

    DOM.editProductForm.name.value = product.name
    DOM.editProductForm.price.value = product.price
    DOM.editProductForm.quantityInDrugstore.value = product.quantityInDrugstore
    DOM.editProductForm.description.value = product.description
    DOM.editProductForm.discountedPrice.value = product.discountedPrice
    DOM.editProductForm.manufacturer.value = product.manufacturer
    DOM.editProductForm.manufacturerCountry.value = product.manufacturerCountry
    DOM.editProductForm.withRecipe.checked = product.withRecipe
    previewImage.src = product.image
    previewImage.setAttribute('data-image', product.image)

    productSelect({
      form: DOM.editProductForm,
      productId,
      selectedAnalogsIds: responseProduct.product.analogs,
    })

    underCategorySelect({
      form: DOM.editProductForm,
      selectedUnderCategoryId: product.underCategoryId,
    })
  } catch (error) {
    console.log(error)
  }

  DOM.editProductForm.addEventListener('submit', async e => {
    e.preventDefault()

    try {
      const responseProductUpdate = await ProductService.update({
        productData: productData({ e, previewImage }),
        productId,
      })

      if (responseProductUpdate.success) {
        alert('Товар оновлено')
      }
    } catch (error) {
      console.log(error)
    }
  })
})()
