import { globalConfig } from '@/config'
import { loggerInstance } from '@/services'
import { toastUtils } from '@/utils'

let isRequestRunningForServerStatus = false

export const checkServerStatus = () => {
  if (!isRequestRunningForServerStatus) {
    isRequestRunningForServerStatus = true

    const checkServer = () => {
      return new Promise((resolve) => {
        const fetchToServer = () => {
          fetch(globalConfig.baseURL.backend, { signal: AbortSignal.timeout(2000) })
            .then(() => {
              resolve('ok')
              clearInterval(timeout)
              isRequestRunningForServerStatus = false
            })
            .catch(() => {
              loggerInstance.log('checkServerStatus.util.ts', 'the server is still offline')
            })
        }

        const timeout = setInterval(fetchToServer, 4000)
      })
    }

    toastUtils.promise('Waiting for server response...', 'Try out the app :)', 'Wait some seconds...', checkServer())
  }
}
