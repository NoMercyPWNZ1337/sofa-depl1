import { Fetch } from '../utils/fetch.utility.js'
import { state } from '../state/index.js'

export const loginService = async userData => {
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

export const registrationService = async userData => {
  const response = await Fetch({
    method: 'post',
    url: '/api/registration',
    body: userData,
  })

  return response
}

export const autoLoginService = async () => {
  const token = localStorage.getItem('token')

  if (token) {
    const response = await Fetch({
      method: 'get',
      url: '/api/check-auth',
      token,
    })

    if (response.success) {
      state.isAuth = true
      state.user = response.user
    }
  } else {
    document.location.href = '/login'
  }
}

export const autoCheckAccess = async () => {
  const token = localStorage.getItem('token')

  if (token) {
    const response = await Fetch({
      method: 'get',
      url: '/api/check-access',
      token,
    })

    if (!response.success) {
      document.location.href = '/login'
    }
  } else {
    document.location.href = '/login'
  }
}

export const logoutService = async () => {
  localStorage.removeItem('token')

  state.isAuth = false
  state.user = false

  document.location.reload()
}
