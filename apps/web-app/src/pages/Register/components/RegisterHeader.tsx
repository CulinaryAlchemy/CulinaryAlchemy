import { useTranslation } from '@/hooks'
import Typography from '@mui/joy/Typography/'

export const RegisterHeader = () => {
  const { t } = useTranslation()
  return (
        <div>
            <Typography level="h4" component="h1">
                <b>{t('welcome')}</b>
            </Typography>
            <Typography level="body2">{`${t('sign up')} ${t('to continue')}`}</Typography>
        </div>
  )
}
