import makeApiCall from '.'


export async function getProfile(userId:string) {
  const response = await makeApiCall(`/user?userId=${userId}`, 'get')
  console.log(response)
  return response
}

