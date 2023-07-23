import { config } from '@/config'
import { getFromLocalStorage } from '@/utils'
import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios'

export const setAxiosInterceptors = () => {
  const accessToken = getFromLocalStorage(config.localStorage.auth.accessToken)

  const updateHeaders = (request: AxiosRequestConfig) => {
    const newHeaders = {
      Authorization: `Barrer ${accessToken as string}`,
      'Content-Type': 'application/json'
    }

    request.headers = newHeaders

    return request
  }

  axios.interceptors.request.use((request) => {
    console.log({ request })
    if (accessToken == null || request.url == null || request.url.includes('static-file paths')) return request

    const newRequest = updateHeaders(request) as InternalAxiosRequestConfig

    console.log({ request, newRequest })

    return newRequest
  })

  axios.interceptors.response.use((respnse) => {
    console.log(respnse)

    return respnse
  })
}
