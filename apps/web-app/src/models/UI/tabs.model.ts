export interface ITab {
  name: string
  traduction: React.ReactNode
}

export type TTabDataRecord = Record<string, ITab>

export type TTabArray = ITab[]
