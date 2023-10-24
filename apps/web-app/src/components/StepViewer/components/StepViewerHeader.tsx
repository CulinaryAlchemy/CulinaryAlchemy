import { AppLink } from '@/components'
import { type IApiResponse, type IRecipe, type IUserApiResponse } from '@/models/LOGIC'
import { CBackRoutes, CFrontRoutes } from '@/routing'
import { ModalClose } from '@mui/joy'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import { Link } from 'react-router-dom'
import useSWR from 'swr'

interface IProps {
  recipeData: IRecipe
  userId: number
}

export const StepViewerHeader: React.FC<IProps> = ({ recipeData, userId }) => {
  const { data } = useSWR<IApiResponse<IUserApiResponse>>(userId != null && CBackRoutes.Dynamic.user.getById(userId))

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
            {recipeData.title}
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
              to={CFrontRoutes.Dynamic.user(data?.data?.username as string)}
            >
              {data?.data?.username as string}
            </AppLink>
          </Typography>
        </Box>
      </hgroup>
      <ModalClose
        component={Link}
        onClick={handleOnCloseClick}
        to={CFrontRoutes.Dynamic.recipe(String(recipeData.id))}
        sx={{
          position: 'relative',
          top: 0,
          right: 0
        }}
      />
    </Box>
  )
}
