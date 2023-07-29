import { frontRoutes } from '@/routing'
import Typography from '@mui/joy/Typography/'
import { Link } from 'react-router-dom'

export const LoginFooter = () => {
  return (
        <Typography
            endDecorator={<Link to={frontRoutes.Static.register}>Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
        >
            Don&apos;t have an account?
        </Typography>
  )
}
