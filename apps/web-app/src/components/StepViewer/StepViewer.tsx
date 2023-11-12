import { AppLink, Loading } from '@/components'
import { useGlobalAuth } from '@/hooks'
import { GlobalLayout, MessageLayout } from '@/layouts'
import { type IApiResponse, type IRecipe, type TStepArray } from '@/models/LOGIC'
import { CBackRoutes, CFrontRoutes } from '@/routing'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import { type AxiosError } from 'axios'
import { Suspense, lazy, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'

const StepViewerHeader = lazy(() => import('./components/StepViewerHeader'))
const StepViewerMain = lazy(() => import('./components/StepViewerMain'))


interface IProps {
  handleOnClose: () => void
  showStepViewer: boolean
}

const StepViewer: React.FC<IProps> = () => {
  const { recipeId } = useParams()
  const { data, isLoading, error } = useSWR<IApiResponse<IRecipe>, AxiosError<IApiResponse<IRecipe>>>(CBackRoutes.Dynamic.recipe.getById(Number(recipeId)))
  const { user } = useGlobalAuth()

  useEffect(() => {
    // Verifica si el navegador admite la API Fullscreen
    if (document.documentElement.requestFullscreen) {
      // Entra en modo pantalla completa
      void document.documentElement.requestFullscreen()
    }
  }, [])

  // @ts-expect-error the back-end is sending the steps in json
  const stepsParsed = data?.data?.steps != null ? JSON.parse(data?.data?.steps as string) as TStepArray : []

  return (
    <GlobalLayout newTitle={recipeId as string}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.1em',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'var(--joy-palette-background-surface);'
        }}
      >
        {
          (!isLoading && (error != null || data == null)) &&
          (
            <MessageLayout>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.2em',
                  alignItems: 'center'
                }}
              >
                <Typography level='h2'>
                  {
                    (error?.response?.status != null && error.response.status === 404)
                      ? 'Recipe not found'
                      : 'Something went wrong'
                    }
                </Typography>
                <AppLink
                  sx={{ fontSize: '1.2em', fontWeight: '600', textDecoration: 'underline' }}
                  to={CFrontRoutes.Static.home}
                >
                  Go to home
                </AppLink>
              </Box>
            </MessageLayout>
          )
        }
        {
          isLoading &&
          (
            <MessageLayout>
              <Loading size='lg' />
            </MessageLayout>
          )
        }
        {
          (!isLoading && (data?.data != null && error == null)) && (
            <Suspense>
              <StepViewerHeader
                recipeData={data.data}
                userId={data?.data?.user_id as number}
              />
              <StepViewerMain
                recipeId={recipeId}
                defaultSteps={stepsParsed}
                isEditable={user?.id === data?.data?.user_id}
              />
            </Suspense>
          )
        }

      </Box>
    </GlobalLayout>
  )
}

export default StepViewer
