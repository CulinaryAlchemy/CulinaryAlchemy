import { Link } from '@/components'
import { CRoutes } from '@/routing'
import Typography from '@mui/joy/Typography/'

export const RegisterFooter = () => {
  return (
        <Typography
            endDecorator={<Link to={CRoutes.login}>Log in</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
        >
            Do you already have an account?
        </Typography>
  )
}
