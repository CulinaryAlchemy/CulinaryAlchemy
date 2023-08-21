import DefaultList from '@mui/joy/List'
import { listItemClasses } from '@mui/joy/ListItem'
import { ListItem } from './components'

interface IStyles {
  items?: {
    hover?: {
      backgroundColor?: string
    }
  }
}

interface IProps {
  items: React.ReactNode[] | string[]
  styles?: IStyles
}

export const List: React.FC<IProps> = ({ items, styles }) => {
  return (
    <DefaultList sx={{
      [`& .${listItemClasses.root}`]: {
        '&:hover': {
          backgroundColor: styles?.items?.hover?.backgroundColor
        }
      }
    }}>
      {
        items.map((item, index) => (
          <ListItem key={index}>
            {item}
          </ListItem>
        ))
      }
    </DefaultList>
  )
}
