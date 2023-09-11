import Popper from '@mui/base/Popper'
import Avatar from '@mui/joy/Avatar'
import Box from '@mui/joy/Box'
import IconButton from '@mui/joy/IconButton'

import { DropDownListOfItems } from '@/components/DropDownMenu/components'
import { useGlobalAuth } from '@/hooks'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import { useState } from 'react'

export const DropDownMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null)
  const { user } = useGlobalAuth()

  const open = Boolean(anchorEl)
  const id = open ? 'admissions-popper' : undefined

  return (
    <Box
      onMouseLeave={() => {
        setAnchorEl(null)
      }}
    >
      <Stack direction="row" alignItems="left" sx={{ gap: '0.4em' }}>
        <Stack sx={{ alignItems: 'end' }}>
          <Typography level="body1" sx={{ fontWeight: '600' }}>
            {user?.name}
          </Typography>
          <Typography level="body2" sx={{ fontSize: '0.75em' }}>
            @{user?.username}
          </Typography>
        </Stack>
        <IconButton
          color="neutral"
          variant="outlined"
          sx={{ width: '2.5em', height: '2.5em', borderRadius: '100%' }}
          aria-haspopup
          aria-expanded={open ? 'true' : 'false'}
          role="menuitem"
          onFocus={(event) => {
            setAnchorEl(event.currentTarget)
          }}
          onMouseEnter={(event) => {
            setAnchorEl(event.currentTarget)
          }}
        >
          <Avatar
            sx={{ width: '2.5em', height: '2.5em', borderRadius: '100%' }}
            alt="user logo"
            src={user?.avatar as string}
          />
        </IconButton>
      </Stack>
      <Box
        sx={{
          position: 'relative',
          zIndex: '2000',
          '& > *': {
            backgroundColor: 'var(--joy-palette-background-body)',
            borderRadius: 'sm'
          }
        }}
      >
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          keepMounted
          disablePortal
        >
          <DropDownListOfItems />
        </Popper>
      </Box>
    </Box>
  )
}
