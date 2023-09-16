import Popper from '@mui/base/Popper'
import Box from '@mui/joy/Box'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

import { Image } from '@/components'
import { DropDownListOfItems } from '@/components/DropDownMenu/components'
import { useGlobalAuth } from '@/hooks'
import { useState } from 'react'

const DropDownMenu = () => {
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
            {user?.name ?? user?.username}
          </Typography>
          <Typography level="body2" sx={{ fontSize: '0.75em' }}>
            @{user?.username}
          </Typography>
        </Stack>
        <Sheet
          color="neutral"
          variant="outlined"
          sx={{
            width: '2.5em',
            height: '2.5em',
            borderRadius: '100%',
            cursor: 'pointer',
            overflow: 'hidden'
          }}
          aria-haspopup
          aria-expanded={open ? 'true' : 'false'}
          role="menuitem"
          onFocus={(event) => {
            if (event == null) return
            setAnchorEl(event.currentTarget as unknown as HTMLAnchorElement)
          }}
          onMouseEnter={(event) => {
            setAnchorEl(event.currentTarget as unknown as HTMLAnchorElement)
          }}
        >
          <Image
            src={user?.avatar as string}
            srcBlurPlaceholder={user?.avatarBlur as string}
            style={{ width: '2.5em', height: '2.5em', borderRadius: '100%' }}
            alt="user logo"
          />
        </Sheet>
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

export default DropDownMenu
