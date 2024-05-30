;(async () => {
  const { AuthService } = await import('../../services/auth.js')
  const { UserService } = await import('../../services/user.js')

  const personalAccountForm = document.querySelector('#account-form')

  let userId = null

  try {
    const responseAuth = await AuthService.checkAuth()

    if (!responseAuth.success) return

    const user = responseAuth.user

    personalAccountForm.name.value = user.name
    personalAccountForm.lastName.value = user.lastName
    personalAccountForm.phone.value = user.phone
    personalAccountForm.email.value = user.email

    userId = user._id
  } catch (error) {
    console.log(error)
  }

  personalAccountForm.addEventListener('submit', async e => {
    e.preventDefault()

    try {
      const responseUser = await UserService.update({
        userId,
        userData: {
          name: e.target.name.value,
          lastName: e.target.lastName.value,
          phone: e.target.phone.value,
          email: e.target.email.value,
        },
      })

      if (responseUser.success) {
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
