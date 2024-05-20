/**
 * @param {body, token, method, url}
 */

export const Fetch = async props => {
  try {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }

    if (props.token) {
      headers.Authorization = `Bearer ${props.token}`
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
