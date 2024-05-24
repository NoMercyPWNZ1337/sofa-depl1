;(async () => {
  const { checkAuthService, checkAccessService } = await import(
    '../../services/auth.js'
  )
  const { Fetch } = await import('../../utils/fetch.utility.js')
  const { uploadImage } = await import('./components/upload-image.js')
  const { productData } = await import('./components/product-data.js')

  checkAuthService()
  checkAccessService()

  const productId = new URLSearchParams(window.location.search).get('id')
  const editProductForm = document.querySelector('#edit-product')

  const { product } = await Fetch({
    url: `/api/products/${productId}`,
    method: 'get',
  })

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
      const response = await Fetch({
        url: `/api/update-product/${productId}`,
        method: 'put',
        body: productData({ e, previewImage }),
      })

      if (response.success) {
        alert('Товар оновлено')
      }
    } catch (error) {
      console.log(error)
    }
  })
})()
