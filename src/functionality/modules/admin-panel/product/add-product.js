;(async () => {
  const { AuthService } = await import('../../../services/auth.js')
  const { ProductService } = await import('../../../services/product.js')
  const { uploadImage } = await import('../components/upload-image.js')
  const { productData } = await import('../components/product-data.js')
  const { categorySelect } = await import('../components/category-select.js')

  await AuthService.checkAuth()
  await AuthService.checkAccess()

  const previewImage = uploadImage()
  const addProductForm = document.querySelector('#add-product')

  categorySelect({ form: addProductForm })

  addProductForm.addEventListener('submit', async e => {
    e.preventDefault()

    try {
      const response = await ProductService.create({
        productData: productData({ e, previewImage }),
      })

      if (response.success) {
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
