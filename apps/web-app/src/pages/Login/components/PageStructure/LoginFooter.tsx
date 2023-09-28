import { useTranslation } from '@/hooks'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'

export const LoginFooter = () => {
  const { t } = useTranslation()

  return (
    <Box
      component='footer'
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <input id='idee' type="checkbox" />
        <label htmlFor='idee'>
          <Typography level='body3'>{t('remember me')}</Typography>
        </label>
      </Box>
      <Typography level='body3'>{t('forgot your password?')}</Typography>
    </Box>
  )
}
