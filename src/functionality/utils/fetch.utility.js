/**
 * @param {body, token, method, url}
 */

export const Fetch = async props => {
  try {
    const token = localStorage.getItem('token')

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(props.url, {
      method: props.method,
      headers,
      body: JSON.stringify(props.body),
    })

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}
