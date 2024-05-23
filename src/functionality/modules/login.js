;(async () => {
  const { loginService } = await import('../services/auth.js')

  const loginForm = document.querySelector('#login-form')

  loginForm.addEventListener('submit', async e => {
    e.preventDefault()

    try {
      const loginResponse = await loginService({
        login: e.target.login.value,
        password: e.target.password.value,
      })

      if (loginResponse.success) {
        document.location.href = '/'
      }
    } catch (error) {
      console.log(error)
    }
  })
})()