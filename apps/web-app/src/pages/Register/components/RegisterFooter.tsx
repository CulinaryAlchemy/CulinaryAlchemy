import { useTranslation } from '@/hooks'
import { frontRoutes } from '@/routing'
import Typography from '@mui/joy/Typography/'
import { Link } from 'react-router-dom'

export const RegisterFooter = () => {
  const { t } = useTranslation()
  return (
        <Typography
            endDecorator={<Link to={frontRoutes.Static.auth.login}>{t('login')}</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
        >
          {t('do you already have an account?')}
        </Typography>
  )
}
