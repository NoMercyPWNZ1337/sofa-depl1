;(async () => {
  const { checkAuthService, checkAccessService } = await import(
    '../../services/auth.js'
  )
  const { Fetch } = await import('../../utils/fetch.utility.js')
  const { uploadImage } = await import('./components/upload-image.js')
  const { productData } = await import('./components/product-data.js')

  checkAuthService()
  checkAccessService()

  const addProductForm = document.querySelector('#add-product')

  const previewImage = uploadImage()

  addProductForm.addEventListener('submit', async e => {
    e.preventDefault()

    try {
      const response = await Fetch({
        url: '/api/create-product',
        method: 'post',
        body: productData({ e, previewImage }),
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
