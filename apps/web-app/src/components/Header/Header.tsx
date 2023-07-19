import RestaurantRounded from '@mui/icons-material/RestaurantRounded'
import Box from '@mui/joy/Box'
import Stack from '@mui/joy/Stack'
import { ToggleTheme } from '..'

export const Header = () => {
  return (
    <>
      <Stack sx={{ position: 'relative' }} padding='1em' direction='row' justifyContent='center' alignItems='center'>
        <RestaurantRounded sx={{ fontSize: '2.7em' }} />
        <Box sx={{ position: 'absolute', top: 0, right: 0, padding: '1em' }}>
          <ToggleTheme />
        </Box>
      </Stack>

    </>
  )
}
