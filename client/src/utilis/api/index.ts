import axios, { type AxiosRequestConfig } from 'axios'

import { TOKEN_KEY, USERID } from '../constants'
const baseURL = import.meta.env.VITE_API_BASEURL

let token
if (typeof window !== 'undefined') {
  token = localStorage.getItem(TOKEN_KEY)
}

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

async function makeApiCall<T = any>(
  url: string,
  method: AxiosRequestConfig['method'] = 'get',
  payload?: AxiosRequestConfig['data'],
  axiosRequestConfig?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>
): Promise<T> {
  try {
    if (!baseURL || typeof baseURL !== 'string') {
      throw new Error('BASEURL is not defined')
    }
    const { data } = await axios({
      url,
      method,
      data: payload,
      baseURL,
      ...axiosRequestConfig
    })

    return data
  } catch (error: any) {
    if (error.response) {
      console.log(error.response)
      if (error.response.status === 403 || error.response.status === 401) {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USERID)
        window.location.replace('/login')
      }
    }
    throw new Error(error.response?.data?.message || error.message)
  }
}

export default makeApiCall
