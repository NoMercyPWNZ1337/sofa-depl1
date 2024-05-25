;(async () => {
  const { AuthService } = await import('../services/auth.js')
  const { Redirect } = await import('../utils/redirect.utillity.js')

  const loginForm = document.querySelector('#login-form')

  loginForm.addEventListener('submit', async e => {
    e.preventDefault()

    try {
      const response = await AuthService.login({
        login: e.target.login.value,
        password: e.target.password.value,
      })

      if (response.success) {
        Redirect('/')
      }
    } catch (error) {
      console.log(error)
    }
  })
})()
