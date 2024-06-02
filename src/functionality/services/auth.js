import { Fetch } from '../utils/fetch.utility.js'
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
  return await Fetch({ method: 'get', url: '/api/check-auth' })
}

const checkAccess = async () => {
  return await Fetch({ method: 'get', url: '/api/check-access' })
}

const logout = async () => {
  localStorage.clear()

  Redirect('/')
}

export const AuthService = {
  login,
  registration,
  checkAuth,
  checkAccess,
  logout,
}
