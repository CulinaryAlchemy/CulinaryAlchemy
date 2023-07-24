import RestaurantRounded from '@mui/icons-material/RestaurantRounded'
import Box from '@mui/joy/Box'
import Stack from '@mui/joy/Stack'

import { Link, ToggleTheme } from '@/components'
import { CRoutes } from '@/routing'

export const Header = () => {
  return (
    <>
      <Stack sx={{ position: 'relative' }} padding='1em' direction='row' justifyContent='center' alignItems='center'>
        <Link to={CRoutes.index}>
          <RestaurantRounded sx={{ fontSize: '2.7em' }} />
        </Link>
        <Box sx={{ position: 'absolute', top: 0, right: 0, padding: '1em' }}>
          <ToggleTheme />
        </Box>
      </Stack>

    </>
  )
}
