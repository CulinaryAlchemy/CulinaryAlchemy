import { globalConfig } from '@/config'
import { type IApiResponse } from '@/models/LOGIC'
import { loggerInstance } from '@/services'
import { checkServerStatus, getFromStorage, getValidationError, toastUtils } from '@/utils'
import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

export const setAxiosInterceptors = () => {
  const getAccessToken = () => {
    const accessToken = getFromStorage(globalConfig.localStorage.auth.accessToken, 'localStorage') ?? getFromStorage(globalConfig.localStorage.auth.accessToken, 'sessionStorage')
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
    if (request.signal != null) return request

    request.signal = AbortSignal.timeout(8000)
    return request
  }

  const updateRequest = (request: AxiosRequestConfig) => {
    updateHeaders(request)
    addSignal(request)

    return request
  }

  axios.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    if (request.url == null || request.url.includes('static-file paths')) return request

    const newRequest = updateRequest(request) as InternalAxiosRequestConfig

    loggerInstance.log('Axios.interceptors.ts - requests', { request, newRequest })

    return newRequest
  })

  axios.interceptors.response.use(
    (success: AxiosResponse<IApiResponse<unknown>>) => {
      loggerInstance.log('Axios.interceptors.ts - response', success)

      const successMessage = getValidationError(success.data.message)

      if (successMessage != null) {
        toastUtils.success(successMessage)
      }

      return success
    },
    (error: AxiosError<IApiResponse<unknown>>) => {
      loggerInstance.err('Axios.interceptors.ts - response', error)
      if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CANCELED') {
        checkServerStatus()
      } else {
        let errorMessage = ''

        if (error?.response?.status != null && error?.response?.status >= 500) {
          errorMessage = 'Something went wrong'
        } else {
          errorMessage = getValidationError(error.response?.data?.message as string)
        }

        if (errorMessage != null) {
          toastUtils.error(errorMessage)
        }
      }
      return Promise.reject(error)
    }
  )
}
