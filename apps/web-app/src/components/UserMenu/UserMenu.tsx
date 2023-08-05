import { ToggleTheme, ToggleTranslation } from '@/components'
import Popper from '@mui/base/Popper'
import Avatar from '@mui/joy/Avatar'
import Box from '@mui/joy/Box'
import Chip from '@mui/joy/Chip'
import IconButton from '@mui/joy/IconButton'
import List from '@mui/joy/List'
import ListDivider from '@mui/joy/ListDivider'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import ListItemContent from '@mui/joy/ListItemContent'
import { useState } from 'react'

export const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null)

  const open = Boolean(anchorEl)
  const id = open ? 'admissions-popper' : undefined
  return (
      <Box onMouseLeave={() => { setAnchorEl(null) }}>
        <IconButton
          color='neutral'
          variant='outlined'
          sx={{ width: '2.5em', height: '2.5em', borderRadius: '100%' }}
          aria-haspopup
          aria-expanded={open ? 'true' : 'false'}
          role="menuitem"
          onFocus={(event) => { setAnchorEl(event.currentTarget) }}
          onMouseEnter={(event) => {
            setAnchorEl(event.currentTarget)
          }}
        >
          <Avatar sx={{ width: '2.5em', height: '2.5em', borderRadius: '100%' }} alt='user logo' src='/logo.webp' />
        </IconButton>
        <Popper id={id} open={open} anchorEl={anchorEl} disablePortal keepMounted>
          <List
            role="menu"
            aria-label="About"
            variant="outlined"
            sx={{
              my: 2,
              boxShadow: 'md',
              borderRadius: 'sm',
              minWidth: 180,
              '--List-radius': '8px',
              '--List-padding': '4px',
              '--ListDivider-gap': '4px'
            }}
          >
            <ListItem role="none">
              <ListItemButton role="menuitem">
                <ListItemContent>Settings</ListItemContent>
                <Chip size="sm" variant="soft" color="danger">
                    Unavailable
                </Chip>
              </ListItemButton>
            </ListItem>
            <ListDivider />
            <ToggleTheme />
            <ToggleTranslation />
          </List>
        </Popper>
      </Box>
  )
}
