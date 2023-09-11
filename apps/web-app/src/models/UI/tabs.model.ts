export type TTabPageType = 'routing' | 'no-routing'

export interface ITab {
  name: string
  traduction?: React.ReactNode
  description?: string | React.ReactNode
  to?: string
  showTabHeader?: boolean
  icon?: React.ReactNode
}

export type TTabDataRecord = Record<string, ITab>

export type TTabArray = ITab[]
