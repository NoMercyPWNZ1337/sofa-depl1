;(async () => {
  const { checkAuthService, checkAccessService } = await import(
    '../../services/auth.js'
  )
  const { Fetch } = await import('../../utils/fetch.utility.js')

  checkAuthService()
  checkAccessService()

  const addProductForm = document.querySelector('#add-product')
  const uploadFileForm = document.querySelector('#upload-file')
  const inputFile = uploadFileForm.querySelector('input[name="image"]')
  const previewImage = uploadFileForm.querySelector('#preview-image')

  inputFile.addEventListener('change', async e => {
    try {
      const formData = new FormData()
      formData.append('image', e.target.files[0])

      const response = await Fetch({
        url: '/api/upload-image',
        method: 'post',
        body: formData,
        file: true,
      })

      previewImage.src = response.url
    } catch (error) {
      console.log(error)
    }
  })

  addProductForm.addEventListener('submit', async e => {
    e.preventDefault()

    try {
      const productData = {
        name: e.target.name.value,
        availability: e.target.availability.value,
        price: e.target.price.value,
        quantityInWarehouse: e.target.quantityInWarehouse.value,
        quantityInDrugstore: e.target.quantityInDrugstore.value,
        image: previewImage.src,
      }

      const response = await Fetch({
        url: '/api/create-product',
        method: 'post',
        body: productData,
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
