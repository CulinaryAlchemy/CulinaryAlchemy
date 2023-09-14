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
  promise (loadingMessage: string, successMessage: string, errorMessage: string, promise: Promise<unknown>) {
    defaultToast.promise(promise, {
      loading: loadingMessage,
      success: () => {
        return successMessage
      },
      error: errorMessage,
      duration: 980000
    })
  },
  action (message: string, action: IActionToast) {
    defaultToast(message, {
      action
    })
  }
}
