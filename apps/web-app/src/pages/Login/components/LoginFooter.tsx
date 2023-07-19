import { Link } from '@/components'
import { CRoutes } from '@/routing'
import Typography from '@mui/joy/Typography/'

export const LoginFooter = () => {
  return (
        <Typography
            endDecorator={<Link to={CRoutes.register}>Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
        >
            Don&apos;t have an account?
        </Typography>
  )
}
