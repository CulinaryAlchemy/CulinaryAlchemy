import { globalConfig } from '@/config'
import { toastUtils } from '@/utils'

let isRequestRunningForServerStatus = false

export const checkServerStatus = () => {
  if (!isRequestRunningForServerStatus) {
    isRequestRunningForServerStatus = true

    const checkServer = () => {
      return new Promise((resolve) => {
        const fetchToServer = () => {
          fetch(globalConfig.baseURL.backend, { signal: AbortSignal.timeout(4000) })
            .then(() => {
              resolve('ok')
              clearInterval(timeout)
              isRequestRunningForServerStatus = false
            })
            .catch(() => {
              console.log('the server is still offline')
            })
        }

        const timeout = setInterval(fetchToServer, 4000)
      })
    }

    toastUtils.promise('Waiting for server response...', 'Try out the app :)', 'Wait some seconds...', checkServer())
  }
}
