import makeApiCall from '.'


export async function verification() {
  const response = await makeApiCall('auth/google/success', 'get')
  return response
}

