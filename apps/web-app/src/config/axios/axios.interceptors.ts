import { config } from '@/config'
import { checkServerStatus, getFromLocalStorage, getValidationError, toastUtils } from '@/utils'
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
    console.log({ request })
    if (getAccessToken() == null || request.url == null || request.url.includes('static-file paths')) return request

    const newRequest = updateHeaders(request) as InternalAxiosRequestConfig

    console.log({ request, newRequest })

    return newRequest
  })

  axios.interceptors.response.use(
    (success: AxiosResponse) => {
      toastUtils.success('OK')
      console.log(success)
      return success
    },
    (error: AxiosError) => {
      console.error({ error })
      if (error.code === 'ERR_NETWORK') {
        checkServerStatus()
      } else {
        const errorText = (error.response?.status != null) ? getValidationError(error.response?.status) : 'no found'
        toastUtils.error(errorText)
      }
      return Promise.reject(error)
    }
  )
}
