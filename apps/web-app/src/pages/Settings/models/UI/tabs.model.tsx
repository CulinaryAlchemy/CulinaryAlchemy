import { type TTabDataRecord } from '@/models/UI'
import { CFrontRoutes } from '@/routing'
import { Trans } from 'react-i18next'

export const CTabsData: TTabDataRecord = {
  home: {
    name: 'home',
    traduction: <Trans>home</Trans>,
    to: CFrontRoutes.Static.settings.home.absolute
  },
  account: {
    name: 'account',
    traduction: <Trans>account</Trans>,
    to: CFrontRoutes.Static.settings.account.absolute
  },
  test: {
    name: 'test',
    traduction: <Trans>test</Trans>,
    to: CFrontRoutes.Static.settings.test.absolute
  }
} as const


