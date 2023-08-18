import { type TTabDataRecord } from '@/models/UI'
import { CFrontRoutes } from '@/routing'
import { Trans } from 'react-i18next'

export const CTabsData: TTabDataRecord = {
  account: {
    name: 'account',
    traduction: <Trans>account</Trans>,
    to: CFrontRoutes.Static.settings.account.absolute
  },
  text: {
    name: 'test',
    traduction: <Trans>test</Trans>,
    to: CFrontRoutes.Static.settings.test.absolute
  }
} as const


