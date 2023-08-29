import makeApiCall from '.'

export async function googleLogin(payload: any) {
  const response = await makeApiCall('/auth/google', 'post', payload)
  return response
}
