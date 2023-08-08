import { useTranslation } from '@/hooks'
import Typography from '@mui/joy/Typography/'

export const LoginHeader = () => {
  const { t } = useTranslation()
  return (
        <div>
            <Typography level="h4" component="h1">
                <b>{t('welcome')}</b>
            </Typography>
            <Typography level="body2">{`${t('login')} ${t('to continue')}`}</Typography>
        </div>
  )
}
