import RestaurantRounded from '@mui/icons-material/RestaurantRounded'
import Box from '@mui/joy/Box'
import Stack from '@mui/joy/Stack'

import { useGlobalAuth, useTranslation } from '@/hooks'
import { CFrontRoutes } from '@/routing'
import { lazy } from 'react'

const DropDownMenu = lazy(() => import('@/components/DropDownMenu/DropDownMenu'))
const AppLink = lazy(() => import('@/components/AppLink').then((module) => ({ default: module.AppLink })))

export const Header = () => {
  const { isAuth } = useGlobalAuth()
  const { t } = useTranslation()

  return (
    <header>
      <Stack sx={{
        position: 'relative',
        flexDirection: 'row',
        justifyContent: {
          sm: 'center',
          xs: 'start'
        },
        alignItems: 'center',
        padding: '1em'
      }}>
        {
          isAuth
            ? <AppLink to={CFrontRoutes.Static.home} style={{ color: 'inherit' }}>
              <RestaurantRounded sx={{ fontSize: '2.7em' }} />
            </AppLink>
            : <RestaurantRounded sx={{ fontSize: '2.7em' }} />
        }

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
