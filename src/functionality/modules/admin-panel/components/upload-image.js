import { Fetch } from '../../../utils/fetch.utility.js'

const actualDOM = () => {
  return {
    uploadFileForm: document.querySelector('#upload-file'),
    inputFile: document.querySelector('#upload-file input[name="image"]'),
    previewImage: document.querySelector('#upload-file #preview-image'),
  }
}

export const uploadImage = () => {
  const DOM = actualDOM()

  DOM.inputFile.addEventListener('change', async e => {
    try {
      const formData = new FormData()
      formData.append('image', e.target.files[0])

      const response = await Fetch({
        url: '/api/upload-image',
        method: 'post',
        body: formData,
        file: true,
      })

      DOM.previewImage.src = response.url
      DOM.previewImage.setAttribute('data-image', response.url)
    } catch (error) {
      console.log(error)
    }
  })

  return DOM.previewImage
}
