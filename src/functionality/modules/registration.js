const actualDOM = () => {
  return {
    registrationForm: document.querySelector('#registration-form'),
  }
}

;(async () => {
  const { AuthService } = await import('../services/auth.js')
  const { Redirect } = await import('../utils/redirect.utillity.js')

  const DOM = actualDOM()

  DOM.registrationForm.addEventListener('submit', async e => {
    e.preventDefault()

    if (!e.target.agree.checked) {
      alert('Приміть умови щоб зареєструватися')
      return
    }

    try {
      const userData = {
        name: e.target.name.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        password: e.target.password.value,
      }

      const responseRegistration = await AuthService.registration(userData)

      if (!responseRegistration.success) return

      const responseLogin = await AuthService.login({
        login: userData.email,
        password: userData.password,
      })

      if (responseLogin.success) {
        Redirect('/')
      }
    } catch (error) {
      console.log(error)
    }
  })
})()
