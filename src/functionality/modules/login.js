const actualDOM = () => {
  return {
    loginForm: document.querySelector('#login-form'),
  }
}

;(async () => {
  const { AuthService } = await import('../services/auth.js')
  const { Redirect } = await import('../utils/redirect.utillity.js')

  const DOM = actualDOM()

  DOM.loginForm.addEventListener('submit', async e => {
    e.preventDefault()

    try {
      const responseLogin = await AuthService.login({
        login: e.target.login.value,
        password: e.target.password.value,
      })

      if (responseLogin.success) {
        Redirect('/')
      }
    } catch (error) {
      console.log(error)
    }
  })
})()
