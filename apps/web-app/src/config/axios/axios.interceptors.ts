import { config } from '@/config'
import { getFromLocalStorage, getValidationError, toastUtils } from '@/utils'
import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

export const setAxiosInterceptors = () => {
  const getAccessToken = () => {
    const accessToken = getFromLocalStorage(config.localStorage.auth.accessToken)
    return accessToken
  }

  const updateHeaders = (request: AxiosRequestConfig) => {
    const newHeaders = {
      Authorization: `Bearer ${getAccessToken() as string}`,
      'Content-Type': 'application/json'
    }

    request.headers = newHeaders

    return request
  }

  axios.interceptors.request.use((request) => {
    toastUtils.success('request sended')
    console.log({ request })
    if (getAccessToken() == null || request.url == null || request.url.includes('static-file paths')) return request

    const newRequest = updateHeaders(request) as InternalAxiosRequestConfig

    console.log({ request, newRequest })

    return newRequest
  })

  axios.interceptors.response.use(
    (success: AxiosResponse) => {
      toastUtils.success(getValidationError(success.status))
      console.log(success)
      return success
    },
    (error: AxiosError) => {
      console.error(error)
      const errorText = (error.response?.status != null) ? getValidationError(error.response?.status) : 'default'
      toastUtils.error(errorText)
      return error
    }
  )
}
