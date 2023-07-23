import { toast as defaultToast } from 'sonner'

interface IActionToast {
  label: string
  onClick: () => void
}
export const toastUtils = {
  success (message: string) {
    defaultToast.success(message)
  },
  error (message: string) {
    defaultToast.error(message)
  },
  info (message: string) {
    defaultToast(message)
  },
  promise (promise: Promise<unknown>, success: string, error: string) {
    defaultToast.promise(promise, {
      loading: 'loading...',
      success: () => {
        return success
      },
      error
    })
  },
  action (message: string, action: IActionToast) {
    defaultToast(message, {
      action
    })
  }
}
