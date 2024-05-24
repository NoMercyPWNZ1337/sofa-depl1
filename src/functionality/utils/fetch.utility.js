/**
 * @param {body, token, method, url}
 */

export const Fetch = async props => {
  try {
    const token = localStorage.getItem('token')

    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }

    if (props.file) headers = {}
    if (token) headers.Authorization = `Bearer ${token}`

    const body = props.file ? props.body : JSON.stringify(props.body)

    const response = await fetch(props.url, {
      method: props.method,
      headers,
      body,
    })

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}
