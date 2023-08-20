import { config } from '@/config'
import { toastUtils } from '@/utils'

let isTThereARequestRunning = false

export const checkServerStatus = () => {
  if (!isTThereARequestRunning) {
    isTThereARequestRunning = true

    const checkServer = () => {
      return new Promise((resolve) => {
        const fetchToServer = () => {
          fetch(config.baseURL.backend)
            .then(() => {
              resolve('ok')
              clearInterval(timeout)
              isTThereARequestRunning = false
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
