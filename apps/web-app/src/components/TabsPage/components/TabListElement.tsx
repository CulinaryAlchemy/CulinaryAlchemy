import { type ITab, type TTabPageType } from '@/models/UI'
import Tab from '@mui/joy/Tab'
import { Link } from 'react-router-dom'

interface IProps {
  type: TTabPageType
  tabData: ITab
  to?: string
}

export const TabListElement: React.FC<IProps> = ({ type, to, tabData }) => {
  return (
        <Tab
            key={tabData.name}
            value={tabData.name}
            {...(type === 'routing' && { component: Link, to })}
        >
            {tabData.traduction}
        </Tab>
  )
}
