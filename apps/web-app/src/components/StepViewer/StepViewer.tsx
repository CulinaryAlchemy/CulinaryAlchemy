import { GlobalLayout } from '@/layouts'
import { Box } from '@mui/joy'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { StepViewerHeader, StepViewerMain } from './components'

interface IProps {
  handleOnClose: () => void
  showStepViewer: boolean
}

const StepViewer: React.FC<IProps> = () => {
  const { recipeId } = useParams()

  useEffect(() => {
    // Verifica si el navegador admite la API Fullscreen
    if (document.documentElement.requestFullscreen) {
      // Entra en modo pantalla completa
      void document.documentElement.requestFullscreen()
    }
  }, [])

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
        <StepViewerHeader
          recipeId={recipeId as string}
        />
        <StepViewerMain />
      </Box>
    </GlobalLayout>
  )
}

export default StepViewer
