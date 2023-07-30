import { GlobalLayout } from '@/layouts'
import { type IUser } from '@/models'
import { NotFound } from '@/pages'
import Sheet from '@mui/joy/Sheet'
import { UserHeader, UserMain } from './components'
import { useUserData } from './hooks/'
import { metadata } from './metadata'

const User = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { userName, data, isLoading, error } = useUserData()

  if (isLoading) {
    return <h1>Loading</h1>
  }

  if (data == null) {
    return <NotFound />
  }

  if (error != null) {
    return <h1>Something went wrong</h1>
  }

  return (
    <GlobalLayout newTitle={metadata.title(userName as string)}>
        <Sheet variant='outlined' sx={{ backgroundColor: 'var(--joy-palette-background-surface)', padding: '0px', maxWidth: '37.5em', margin: 'auto', borderRadius: '0.4em', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <UserHeader data={data?.data as IUser} />
          <UserMain />

        </Sheet>
    </GlobalLayout>
  )
}

export default User
