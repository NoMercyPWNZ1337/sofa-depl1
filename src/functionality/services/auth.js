import { Fetch } from '../utils/fetch.utility.js'
import { state } from '../state/index.js'
import { Redirect } from '../utils/redirect.utillity.js'

const login = async userData => {
  const response = await Fetch({
    method: 'post',
    url: '/api/login',
    body: userData,
  })

  if (response.token) {
    localStorage.setItem('token', response.token)
  }

  return response
}

const registration = async userData => {
  const response = await Fetch({
    method: 'post',
    url: '/api/registration',
    body: userData,
  })

  return response
}

const checkAuth = async () => {
  const token = localStorage.getItem('token')

  if (token) {
    const response = await Fetch({ method: 'get', url: '/api/check-auth' })

    if (response.success) {
      state.isAuth = true
      state.user = response.user
    }

    return response
  } else {
    Redirect('/login')
  }
}

const checkAccess = async () => {
  const token = localStorage.getItem('token')

  if (token) {
    const response = await Fetch({ method: 'get', url: '/api/check-access' })

    if (!response.success) {
      Redirect('/login')
    }
  } else {
    Redirect('/login')
  }
}

const logout = async () => {
  localStorage.removeItem('token')

  state.isAuth = false
  state.user = false

  document.location.reload()
}

export const AuthService = {
  login,
  registration,
  checkAuth,
  checkAccess,
  logout,
}
