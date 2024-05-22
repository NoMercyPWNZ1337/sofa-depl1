;(async () => {
  const { registrationService } = await import('../services/auth.js')

  const registrationForm = document.querySelector('#registration-form')

  registrationForm.addEventListener('submit', async e => {
    e.preventDefault()

    const response = registrationService({
      name: e.target.name.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      password: e.target.password.value,
    })

    console.log('errors =>', response.errors)
  })
})()
