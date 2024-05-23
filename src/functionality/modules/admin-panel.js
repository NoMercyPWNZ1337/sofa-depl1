;(async () => {
  const { checkAuthService, checkAccessService } = await import(
    '../services/auth.js'
  )
  const { Fetch } = await import('../utils/fetch.utility.js')

  checkAuthService()
  checkAccessService()

  const addProductForm = document.querySelector('#add-product')

  addProductForm.addEventListener('submit', async e => {
    e.preventDefault()

    try {
    } catch (error) {
      console.log(error)
    }
  })
})()
