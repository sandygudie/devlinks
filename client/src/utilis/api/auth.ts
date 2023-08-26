import makeApiCall from '.'
// import { TOKEN_KEY, LOGOUT_KEY } from '../constants'
import axios from 'axios'

export async function login() {
  const response = await makeApiCall('auth/google/success', 'get')
  
  return response
}

