import Sheet from '@mui/joy/Sheet'
import { UserHeader, UserMain } from './components'

const User = () => {
  return (
        <Sheet variant='outlined' sx={{ backgroundColor: 'var(--joy-palette-background-surface)', padding: '0px', maxWidth: '37.5em', margin: 'auto', borderRadius: '0.4em', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <UserHeader />
          <UserMain />

        </Sheet>
  )
}

export default User
