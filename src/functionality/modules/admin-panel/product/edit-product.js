;(async () => {
  const { AuthService } = await import('../../../services/auth.js')
  const { ProductService } = await import('../../../services/product.js')
  const { uploadImage } = await import('../components/upload-image.js')
  const { productData } = await import('../components/product-data.js')
  const { categorySelect } = await import('../components/category-select.js')

  await AuthService.checkAuth()
  await AuthService.checkAccess()

  const previewImage = uploadImage()
  const productId = new URLSearchParams(window.location.search).get('id')
  const editProductForm = document.querySelector('#edit-product')

  categorySelect({ form: editProductForm })

  try {
    const responseProduct = await ProductService.getOne({ productId })

    if (responseProduct.success) {
      const product = responseProduct.product

      editProductForm.name.value = product.name
      editProductForm.price.value = product.price
      editProductForm.quantityInWarehouse.value = product.quantityInWarehouse
      editProductForm.quantityInDrugstore.value = product.quantityInDrugstore
      editProductForm.category.value = product.categoryId
      editProductForm.description.value = product.description
      editProductForm.discountedPrice.value = product.discountedPrice
      previewImage.src = product.image
      previewImage.setAttribute('data-image', product.image)
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
