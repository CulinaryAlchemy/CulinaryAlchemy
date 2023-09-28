import { AppLink } from '@/components'
import { useTranslation } from '@/hooks'
import { CFrontRoutes } from '@/routing'
import Typography from '@mui/joy/Typography/'

export const LoginHeader = () => {
  const { t } = useTranslation()
  return (
    <div>
      <Typography level="h4" component="h1">
        <b>{t('welcome')}</b>
      </Typography>
      <Typography
        endDecorator={<AppLink to={CFrontRoutes.Static.auth.register}>{t('sign up')}</AppLink>}
        fontSize="sm"
        sx={{ alignSelf: 'center' }}
        level='body2'
      >
        {t('don\'t have an account?')}
      </Typography>
    </div>
  )
}
