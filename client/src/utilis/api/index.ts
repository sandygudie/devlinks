import axios, { type AxiosRequestConfig } from 'axios'
import {  USER_ID } from '../constants'


const baseURL = 'http://localhost:8000/api/v1'

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
      localStorage.removeItem(USER_ID)
      window.location.href="/login"
      throw new Error(error.response?.data?.message || error.message)
      
    }
    throw new Error(error.response?.data?.message || error.message)
  }
}

export default makeApiCall
