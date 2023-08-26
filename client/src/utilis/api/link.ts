import makeApiCall from '.'

export async function updateProfile(userId: string, payload: any) {
  const response = await makeApiCall(`/link?userId=${userId}`, 'post', payload)
  return response
}
