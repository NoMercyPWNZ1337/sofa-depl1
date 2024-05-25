;(async () => {
  const { AuthService } = await import('../../../services/auth.js')
  const { ProductService } = await import('../../../services/product.js')
  const { uploadImage } = await import('../components/upload-image.js')
  const { productData } = await import('../components/product-data.js')

  await AuthService.checkAuth()
  await AuthService.checkAccess()

  const productId = new URLSearchParams(window.location.search).get('id')
  const editProductForm = document.querySelector('#edit-product')

  const { product } = await ProductService.getOne({ productId })

  const previewImage = uploadImage()

  if (Object.keys(product).length) {
    editProductForm.name.value = product.name
    editProductForm.price.value = product.price
    editProductForm.quantityInWarehouse.value = product.quantityInWarehouse
    editProductForm.quantityInDrugstore.value = product.quantityInDrugstore
    previewImage.src = product.image
    previewImage.setAttribute('data-image', product.image)
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
