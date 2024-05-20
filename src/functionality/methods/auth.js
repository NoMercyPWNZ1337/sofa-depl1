export const login = async () => {}

export const registration = async () => {}

export const autoLogin = () => {
  const token = localStorage.getItem('token')

  if (token) {
    login()
  } else {
    document.location.href = '/login'
  }
}
