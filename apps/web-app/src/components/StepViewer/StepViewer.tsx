import { Loading } from '@/components'
import { useGlobalAuth, useRecipeMethods } from '@/hooks'
import { GlobalLayout, MessageLayout } from '@/layouts'
import { type IApiResponse, type IRecipe, type TStepArray } from '@/models/LOGIC'
import { CBackRoutes } from '@/routing'
import { Box } from '@mui/joy'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { StepViewerHeader, StepViewerMain } from './components'

interface IProps {
  handleOnClose: () => void
  showStepViewer: boolean
}

const StepViewer: React.FC<IProps> = () => {
  const { recipeId } = useParams()
  const { data, isLoading } = useSWR<IApiResponse<IRecipe>>(CBackRoutes.Dynamic.recipe.getById(Number(recipeId)))
  const { updateRecipe } = useRecipeMethods()
  const { user } = useGlobalAuth()

  useEffect(() => {
    // Verifica si el navegador admite la API Fullscreen
    if (document.documentElement.requestFullscreen) {
      // Entra en modo pantalla completa
      void document.documentElement.requestFullscreen()
    }
  }, [])

  const handleOnSaveSteps = async (stepsData: unknown) => {
    if (data?.data == null) return

    const newSteps: IRecipe = { ...data.data, steps: stepsData as TStepArray }
    return await updateRecipe(String(recipeId), newSteps)
  }



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
          isLoading
            ? (
              <MessageLayout>
                <Loading size='lg' />
              </MessageLayout>
              )
            : (
              <>
                <StepViewerHeader
                  recipeData={data?.data as IRecipe}
                  userId={data?.data?.user_id as number}
                />
                <StepViewerMain
                  defaultSteps={data?.data?.steps}
                  onSaveSteps={handleOnSaveSteps}
                  isEditable={user?.id === data?.data?.user_id}
                />
              </>
              )
        }

      </Box>
    </GlobalLayout>
  )
}

export default StepViewer
