/**
 * @param {body, method, url}
 */

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
    alert(data.message)
  }

  return data
}
