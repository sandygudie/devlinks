import makeApiCall from '.'

export async function getProfile(userId: string) {
  const response = await makeApiCall(`/user?userId=${userId}`, 'get')
  return response
}

export async function updateProfile(userId: string, payload: any) {
  const response = await makeApiCall(`/user?userId=${userId}`, 'post', payload)
  return response
}

export async function getPublicDetails(shareId: string) {
  const response = await makeApiCall(`/publicview?shareId=${shareId}`, 'get')
  return response
}