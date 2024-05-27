;(async () => {
  const { AuthService } = await import('../../../services/auth.js')
  const { ProductService } = await import('../../../services/product.js')
  const { uploadImage } = await import('../components/upload-image.js')
  const { productData } = await import('../components/product-data.js')
  const { categorySelect } = await import('../components/category-select.js')
  const { productSelect } = await import('../components/product-select.js')

  await AuthService.checkAuth()
  await AuthService.checkAccess()

  const previewImage = uploadImage()
  const productId = new URLSearchParams(window.location.search).get('id')
  const editProductForm = document.querySelector('#edit-product')

  try {
    const responseProduct = await ProductService.getOne({ productId })

    if (responseProduct.success) {
      const product = responseProduct.product

      editProductForm.name.value = product.name
      editProductForm.price.value = product.price
      editProductForm.quantityInWarehouse.value = product.quantityInWarehouse
      editProductForm.quantityInDrugstore.value = product.quantityInDrugstore
      editProductForm.description.value = product.description
      editProductForm.discountedPrice.value = product.discountedPrice
      editProductForm.manufacturer.value = product.manufacturer
      editProductForm.manufacturerCountry.value = product.manufacturerCountry
      editProductForm.withRecipe.checked = product.withRecipe
      previewImage.src = product.image
      previewImage.setAttribute('data-image', product.image)

      productSelect({
        form: editProductForm,
        productId,
        selectedAnalogsIds: responseProduct.product.analogs,
      })

      categorySelect({
        form: editProductForm,
        selectedCategoryId: product.categoryId,
      })
    }
  } catch (error) {
    console.log(error)
  }

  editProductForm.addEventListener('submit', async e => {
    e.preventDefault()

    try {
      const response = await ProductService.update({
        productData: productData({ e, previewImage }),
        productId,
      })

      if (response.success) {
        alert('Товар оновлено')
      }
    } catch (error) {
      console.log(error)
    }
  })
})()
