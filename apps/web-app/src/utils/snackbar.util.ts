import { toast as defaultToast } from 'sonner'

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
  promise (promise: Promise<any>, success: string, error: string) {
    defaultToast.promise(promise, {
      loading: 'loading...',
      success: () => {
        return success
      },
      error
    })
  }
}
