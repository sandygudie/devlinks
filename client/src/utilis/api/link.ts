import makeApiCall from '.'

export async function addLink(userId: string, payload: any) {
  const response = await makeApiCall(`/link?userId=${userId}`, 'post', payload)
  return response
}
