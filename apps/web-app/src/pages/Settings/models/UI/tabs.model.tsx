import { type TTabDataRecord } from '@/models/UI'
import { CFrontRoutes } from '@/routing'
import { lazy } from 'react'
import { Trans } from 'react-i18next'

const HeartBrokenIcon = lazy(() => import('@mui/icons-material/HeartBroken'))
const PersonIcon = lazy(() => import('@mui/icons-material/Person'))

export const CTabsData: TTabDataRecord = {
  home: {
    name: 'home',
    traduction: <Trans>home</Trans>,
    to: CFrontRoutes.Static.settings.home.absolute,
    showTabHeader: false
  },
  account: {
    name: 'account',
    description: <Trans>accountTabPanel message</Trans>,
    traduction: <Trans>account</Trans>,
    to: CFrontRoutes.Static.settings.account.absolute
  }
} as const

export const CTabsDataAccountTabPanel: TTabDataRecord = {
  information: {
    name: 'account information',
    description: <Trans>accountInformationTabPanel message</Trans>,
    traduction: <Trans>account information</Trans>,
    to: CFrontRoutes.Static.settings.information.absolute,
    showTabHeader: false,
    icon: <PersonIcon sx={{ fontSize: '1.4em' }} />
  },
  deactivate: {
    name: 'deactivate account',
    description: <Trans>deleteAccountTabPanel message</Trans>,
    traduction: <Trans>delete account</Trans>,
    to: CFrontRoutes.Static.settings.deactivate.absolute,
    showTabHeader: false,
    icon: <HeartBrokenIcon sx={{ fontSize: '1.4em' }} />
  }
} as const

