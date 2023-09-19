import { LinearLoading, TestServerStatus } from '@/components'
import { Toaster } from 'sonner'

export const GlobalComponents = () => {
  return (
        <>
            <Toaster
                richColors
                theme='light'
                visibleToasts={3}
            />
            <TestServerStatus />
            <LinearLoading />
        </>
  )
}
