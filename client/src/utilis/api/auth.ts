import axios from 'axios'
import makeApiCall from '.'

export async function login() {
  const response = await axios.get('https://devlinks-api.vercel.app/ap/v1/auth/google')
  return response
}
export async function verification() {
  const response = await makeApiCall('/auth/google/success', 'get')
  return response
}

