import { useGlobalLoading } from '@/hooks'
import { Suspense, lazy } from 'react'
const Box = lazy(() => import('@mui/joy/Box'))
const LinearProgress = lazy(() => import('@mui/joy/LinearProgress'))

export const LinearLoading = () => {
  const { isVisibleLoading } = useGlobalLoading()

  return (
    <Suspense>
      {
        isVisibleLoading && (
          <Box
            sx={{
              position: 'fixed',
              width: '100vw',
              top: 0,
              zIndex: 1000
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
