import { globalLoadingInstance } from '@/components/GlobalLoading/services'
import { Suspense, lazy, useEffect, useState } from 'react'
const Box = lazy(() => import('@mui/joy/Box'))
const LinearProgress = lazy(() => import('@mui/joy/LinearProgress'))

export const LinearLoading = () => {
  const [showGlobalLoading, setShowGlobalLoading] = useState(false)

  useEffect(() => {
    const handleOnMessage = () => {
      setShowGlobalLoading(prevState => !prevState)
    }

    globalLoadingInstance.listenEvent(handleOnMessage)
  }, [])

  return (
    <Suspense>
      {
        showGlobalLoading && (
          <Box
            sx={{
              position: 'fixed',
              width: '100vw',
              top: 0,
              zIndex: 100000000
            }}
          >
            <LinearProgress
              color="neutral"
              thickness={2}
            />
          </Box>
        )
      }
    </Suspense>
  )
}
