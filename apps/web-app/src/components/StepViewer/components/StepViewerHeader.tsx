import { AppLink } from '@/components'
import { useGlobalAuth } from '@/hooks'
import { CFrontRoutes } from '@/routing'
import { ModalClose } from '@mui/joy'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import { Link } from 'react-router-dom'

interface IProps {
  recipeId: string
}

export const StepViewerHeader: React.FC<IProps> = ({ recipeId }) => {
  const { user } = useGlobalAuth()

  const handleOnCloseClick = () => {
    if (document.exitFullscreen) {
      void document.exitFullscreen()
    }
  }
  return (
    <Box
      component='header'
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'clamp(0em, 2vw, 1em)'
      }}
    >
      <hgroup>
        <Box
          sx={{
            display: 'flex',
            gap: '0.3em'
          }}
        >
          <Typography
            level='h4'
            sx={{
              textTransform: 'uppercase',
              fontWeight: 600,
              fontSize: 'clamp(1em, 5vw, 1.5em)'
            }}
          >
            La paste cream
          </Typography>
          <Typography
            level='body3'
            sx={{
              alignSelf: 'end',
              paddingBottom: '0.3em',
              textTransform: 'capitalize'
            }}
          >
            <span>By </span>
            <AppLink
              onClick={handleOnCloseClick}
              to={CFrontRoutes.Dynamic.user(user?.username as string)}
            >
              {user?.username}
            </AppLink>
          </Typography>
        </Box>
      </hgroup>
      <ModalClose
        component={Link}
        onClick={handleOnCloseClick}
        to={CFrontRoutes.Dynamic.recipe(recipeId)}
        sx={{
          position: 'relative',
          top: 0,
          right: 0
        }}
      />
    </Box>
  )
}
