import { AppLink } from '@/components'
import { useGlobalAuth } from '@/hooks'
import { CFrontRoutes } from '@/routing'
import { Typography } from '@mui/joy'
import Stack from '@mui/joy/Stack'

const PostHeaderForRecipe = () => {
  const { user } = useGlobalAuth()
  return (
        <Stack
            sx={{
              flexDirection: 'row',
              gap: '0.3em'
            }}
        >
            <Typography
                level='h4'
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}
            >
                La paste cream
            </Typography>
            <Stack
                sx={{
                  flexDirection: 'row',
                  alignSelf: 'end',
                  gap: '0.1em'
                }}
            >
                <Typography
                    level='body3'
                >
                    By
                </Typography>
                <Typography
                    level='body2'
                >
                    <AppLink to={CFrontRoutes.Dynamic.user(user?.username as string)}>
                        @hola123
                    </AppLink>
                </Typography>
            </Stack>
        </Stack>
  )
}

export default PostHeaderForRecipe
