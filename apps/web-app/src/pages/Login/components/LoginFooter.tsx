import { useTranslation } from '@/hooks'
import { frontRoutes } from '@/routing'
import Typography from '@mui/joy/Typography/'
import { Link } from 'react-router-dom'

export const LoginFooter = () => {
  const { t } = useTranslation()
  return (
        <Typography
            endDecorator={<Link to={frontRoutes.Static.auth.register}>{t('login.form.footer.link')}</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
        >
          {t('login.form.footer.message')}
        </Typography>
  )
}
