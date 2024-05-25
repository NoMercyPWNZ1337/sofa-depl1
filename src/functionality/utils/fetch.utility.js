import { Redirect } from './redirect.utillity.js'

/**
 * @param {body, method, url}
 */

const notificationErrors = ({ data }) => {
  const errorsList = data.errors?.map(error => `\n⚠️ ${error.msg}`).join('\n')
  let strAlert = data.message + ' ❌' + '\n'

  if (data.errors?.length) {
    strAlert += 'Виправіть помилки:\n' + errorsList
  }

  alert(strAlert)
}

export const Fetch = async props => {
  const token = localStorage.getItem('token')
  const body = props.file ? props.body : JSON.stringify(props.body)

  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if (props.file) {
    headers = {}
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(props.url, {
    method: props.method,
    headers,
    body,
  })

  const data = await response.json()

  if (!response.ok && !data.success) {
    if (response.url.includes('/api/check-auth')) {
      notificationErrors({ data })
      Redirect('/login')
      return
    }

    if (response.url.includes('/api/check-access')) {
      notificationErrors({ data })
      Redirect('/login')
      return
    }

    notificationErrors({ data })
  }

  return data
}
