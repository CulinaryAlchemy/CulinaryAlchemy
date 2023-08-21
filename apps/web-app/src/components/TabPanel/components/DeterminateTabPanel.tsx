import { lazy } from 'react'

type TRoutingBy = 'defaultUISystem' | 'routingSystem' // if routing system is enabled, it will render by route otherwise by UI Tabs system

const DefaultUIPanel = lazy(() => import('@mui/joy/TabPanel'))

interface IProps {
  routingBy: TRoutingBy
  children: React.ReactNode
  value?: string
}

export const DeterminateTabPanel: React.FC<IProps> = ({ routingBy, children, value }) => {
  if (routingBy === 'defaultUISystem') {
    return <DefaultUIPanel value={value}>{children}</DefaultUIPanel>
  } else if (routingBy === 'routingSystem') {
    return <div>{children}</div>
  }
}
