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
        sx={{ fontSize: 'var(--Typography-fontSize, var(--joy-fontSize-sm, 0.875rem))', textWrap: 'balance', color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D))', alignSelf: 'center' }}
      >
        {t('don\'t have an account?')}
      </Typography>
    </div>
  )
}
