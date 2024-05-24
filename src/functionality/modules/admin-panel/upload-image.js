import { Fetch } from '../../utils/fetch.utility.js'

const uploadFileForm = document.querySelector('#upload-file')
const inputFile = uploadFileForm.querySelector('input[name="image"]')
const previewImage = uploadFileForm.querySelector('#preview-image')

export const uploadImage = () => {
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
      previewImage.setAttribute('data-image', response.url)
    } catch (error) {
      console.log(error)
    }
  })

  return previewImage
}
