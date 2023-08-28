import axios, { type AxiosRequestConfig } from 'axios'
let { MODE } = import.meta.env

const baseURL =
  MODE === 'development' ? 'http://localhost:8000/api/v1' : 'https://devlinks-api.vercel.app/api/v1'

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
      withCredentials: true,
      url,
      method,
      data: payload,
      baseURL,
      ...axiosRequestConfig
    })

    return data
  } catch (error: any) {
    if (error.response.status === 403 || error.response.status === 401) {
      // window.location.replace('/login')
      console.log(error.response)
      throw new Error(error.response?.data?.message || error.message)
    }
    throw new Error(error.response?.data?.message || error.message)
  }
}

export default makeApiCall
