const actualDOM = () => {
  return {
    personalAccountForm: document.querySelector('#account-form'),
  }
}

;(async () => {
  const { AuthService } = await import('../../services/auth.js')
  const { UserService } = await import('../../services/user.js')

  const DOM = actualDOM()

  let userId = null

  try {
    const responseAuth = await AuthService.checkAuth()

    if (!responseAuth.success) return

    const user = responseAuth.user

    DOM.personalAccountForm.name.value = user.name
    DOM.personalAccountForm.lastName.value = user.lastName
    DOM.personalAccountForm.phone.value = user.phone
    DOM.personalAccountForm.email.value = user.email

    userId = user._id
  } catch (error) {
    console.log(error)
  }

  DOM.personalAccountForm.addEventListener('submit', async e => {
    e.preventDefault()

    try {
      const responseUserUpdate = await UserService.update({
        userId,
        userData: {
          name: e.target.name.value,
          lastName: e.target.lastName.value,
          phone: e.target.phone.value,
          email: e.target.email.value,
        },
      })

      if (responseUserUpdate.success) {
        alert(
          'Дані оновленно, сторінка перезагрузиться після закриття сповіщення'
        )

        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  })
})()
