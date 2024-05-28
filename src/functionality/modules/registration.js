;(async () => {
  const { AuthService } = await import('../services/auth.js')
  const { Redirect } = await import('../utils/redirect.utillity.js')

  const registrationForm = document.querySelector('#registration-form')

  registrationForm.addEventListener('submit', async e => {
    e.preventDefault()

    try {
      const userData = {
        name: e.target.name.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        password: e.target.password.value,
      }

      const registrationResponse = await AuthService.registration(userData)

      if (!registrationResponse.success) return

      const loginResponse = await AuthService.login({
        login: userData.email,
        password: userData.password,
      })

      if (loginResponse.success) {
        Redirect('/')
      }
    } catch (error) {
      console.log(error)
    }
  })
})()
