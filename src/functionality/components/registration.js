;(async () => {
  const { Fetch } = await import('../utils/fetch.utility.js')

  const registrationForm = document.querySelector('#registration-form')

  registrationForm.addEventListener('submit', async e => {
    e.preventDefault()

    const user = {
      name: e.target.name.value,
      lastName: e.target.lastName.value,
      phone: e.target.phone.value,
      password: e.target.password.value,
    }

    const response = await Fetch({
      method: 'post',
      url: '/api/login',
      body: user,
    })
  })
})()
