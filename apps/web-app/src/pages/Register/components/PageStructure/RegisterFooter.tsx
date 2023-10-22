import { useGlobalAuth, useTranslation } from '@/hooks'
import { type TStorage } from '@/models/LOGIC'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import { useId } from 'react'

export const RegisterFooter = () => {
  const checkboxRememberMeId = useId()
  const { t } = useTranslation()
  const { setStorageMethod, storageMethod } = useGlobalAuth()

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStorageMethod: TStorage = event.currentTarget.checked ? 'localStorage' : 'sessionStorage'
    setStorageMethod(newStorageMethod)
  }

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
        <input
          onChange={handleOnChange}
          id={checkboxRememberMeId}
          type="checkbox"
          defaultChecked={storageMethod === 'localStorage'}
        />
        <label htmlFor={checkboxRememberMeId}>
          <Typography level='body3'>{t('remember me')}</Typography>
        </label>
      </Box>
    </Box>
  )
}
