import RestaurantRounded from '@mui/icons-material/RestaurantRounded'
import Box from '@mui/joy/Box'
import Stack from '@mui/joy/Stack'

import { AppLink, DropDownMenu } from '@/components'
import { useGlobalAuth, useTranslation } from '@/hooks'
import { CFrontRoutes } from '@/routing'
import { Link } from 'react-router-dom'

export const Header = () => {
  const { isAuth } = useGlobalAuth()
  const { t } = useTranslation()

  return (
    <header>
      <Stack sx={{ position: 'relative' }} padding='1em' direction='row' justifyContent='center' alignItems='center'>
        <Link to={CFrontRoutes.Static.index} style={{ color: 'inherit' }}>
          <RestaurantRounded sx={{ fontSize: '2.7em' }} />
        </Link>
        <Box sx={{ position: 'absolute', top: 0, right: 0, padding: '1em' }}>
          {
            isAuth
              ? <DropDownMenu />
              : <AppLink to={CFrontRoutes.Static.auth.register}>{t('sign up')}</AppLink>

          }
        </Box>
      </Stack>

    </header>
  )
}
