import { Loading } from '@/components'
import { GlobalLayout, MessageLayout } from '@/layouts'
import { type IUser } from '@/models/LOGIC'
import { NotFound } from '@/pages'
import Sheet from '@mui/joy/Sheet'
import { UserHeader, UserMain } from './components'
import { useUserData } from './hooks/'
import { metadata } from './metadata'

const User = () => {
  const { userName, data, isLoading, error } = useUserData()

  if (isLoading) {
    return <MessageLayout><Loading size='lg' /></MessageLayout>
  }

  if (error != null && error.response?.status !== 404) {
    return <MessageLayout><h1>Something went wrong</h1></MessageLayout>
  }

  if (data == null) {
    return <NotFound />
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
