export type TTabPageType = 'routing' | 'no-routing'

export interface ITab {
  name: string
  traduction: React.ReactNode
  to?: string
}

export type TTabDataRecord = Record<string, ITab>

export type TTabArray = ITab[]
