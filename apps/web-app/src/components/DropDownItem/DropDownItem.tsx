import { AppLink } from '@/components'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import Sheet from '@mui/joy/Sheet'
import React from 'react'

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
            role="none"
            endAction={
              itemAtTheEnd != null &&
                <Sheet variant='outlined' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2.375em', height: '1.75em', borderRadius: '0.4em' }}>
                    {itemAtTheEnd}
                </Sheet>
            }
        >
          {
            type === 'link' &&
              <ListItemButton>
                <AppLink style={{ width: '100%', height: '100%' }} to={url as string}>{itemText}</AppLink>
              </ListItemButton>
          }
          {
            type === 'button' &&
              <ListItemButton onClick={handleOnClick} role="menuitem">
                  {itemText}
              </ListItemButton>
          }

        </ListItem>
  )
}
