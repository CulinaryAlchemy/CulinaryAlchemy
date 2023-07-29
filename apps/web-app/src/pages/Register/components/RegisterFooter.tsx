import { CStaticRoutes } from '@/routing'
import Typography from '@mui/joy/Typography/'
import { Link } from 'react-router-dom'

export const RegisterFooter = () => {
  return (
        <Typography
            endDecorator={<Link to={CStaticRoutes.login}>Log in</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
        >
            Do you already have an account?
        </Typography>
  )
}
