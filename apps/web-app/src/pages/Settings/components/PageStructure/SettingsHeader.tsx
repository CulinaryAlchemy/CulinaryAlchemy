import { useTranslation } from '@/hooks'
import Typography from '@mui/joy/Typography'

export const SettingsHeader = () => {
  const { t } = useTranslation()
  return (
        <header>
            <Typography fontSize="xl2">
                {t('settings')}
            </Typography>
        </header>
  )
}
