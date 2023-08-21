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
      'Content-Type': request.headers?.['Content-Type'] == null ? 'application/json' : request.headers?.['Content-Type'] as string
    }

    request.headers = newHeaders

    return request
  }

  const addSignal = (request: AxiosRequestConfig) => {
    request.signal = AbortSignal.timeout(10000)
    return request
  }

  const updateRequest = (request: AxiosRequestConfig) => {
    updateHeaders(request)
    addSignal(request)

    return request
  }

  axios.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    console.log({ request })
    if (getAccessToken() == null || request.url == null || request.url.includes('static-file paths')) return request

    const newRequest = updateRequest(request) as InternalAxiosRequestConfig

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
