import { useTranslation } from '@/hooks'
import Typography from '@mui/joy/Typography/'

export const RegisterHeader = () => {
  const { t } = useTranslation()
  return (
        <div>
            <Typography level="h4" component="h1">
                <b>{t('register.form.header.title')}!</b>
            </Typography>
            <Typography level="body2">{t('register.form.header.subTitle')}</Typography>
        </div>
  )
}
