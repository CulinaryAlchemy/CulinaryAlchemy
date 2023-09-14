import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import Sheet from '@mui/joy/Sheet'
import { Link } from 'react-router-dom'

interface IProps {
  type: 'link' | 'button'
  itemText: string
  url?: string
  itemAtTheEnd?: string | React.ReactNode
  onClick?: () => void
}

export const DropDownItem: React.FC<IProps> = ({ type, itemAtTheEnd, itemText, onClick, url }) => {
  const handleOnClick = () => {
    if (onClick != null) onClick()
  }

  return (
    <ListItem
      {...(type === 'link' && { to: url, component: Link, sx: { textDecoration: 'none' } })}
      role="none"
      endAction={
        itemAtTheEnd != null &&
        <Sheet variant='outlined' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2.375em', height: '1.75em', borderRadius: '0.4em' }}>
          {itemAtTheEnd}
        </Sheet>
      }
    >
      <ListItemButton
        onClick={handleOnClick}
        role="menuitem"
        sx={{
          color: type === 'link' ? 'rgba(var(--joy-palette-primary-mainChannel) / 1)' : 'initial',
          '&:hover': {
            color: type === 'link' ? 'rgba(var(--joy-palette-primary-mainChannel) / 1)' : 'initial',
            textDecoration: type === 'link' ? 'underline' : 'initial'
          }
        }}
      >
        {itemText}
      </ListItemButton>
    </ListItem>
  )
}
