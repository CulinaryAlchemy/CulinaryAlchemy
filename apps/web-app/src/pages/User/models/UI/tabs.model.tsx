import { type TTabDataRecord } from '@/models/UI'
import { Trans } from 'react-i18next'


export const CTabsData: TTabDataRecord = {
  recipes: {
    name: 'recipes',
    traduction: <Trans>recipes</Trans>
  },
  tweets: {
    name: 'tweets',
    traduction: <Trans>tweets</Trans>
  }
} as const
