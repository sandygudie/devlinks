import makeApiCall from '.'

export async function login() {
  const response = await makeApiCall('auth/google/success', 'get')
  return response
}

