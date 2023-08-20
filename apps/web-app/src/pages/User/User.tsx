import { Loading } from '@/components'
import { GlobalLayout, MessageLayout } from '@/layouts'
import { type IUser } from '@/models/LOGIC'
import Sheet from '@mui/joy/Sheet'
import { Suspense, lazy } from 'react'
import { UserHeader, UserMain } from './components'
import { useUserData } from './hooks/'

const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFound'))

const User = () => {
  const { userName, data, isLoading, error } = useUserData()

  if (isLoading) {
    return <MessageLayout><Loading size='lg' /></MessageLayout>
  }

  if (error != null && error.response == null) {
    return <MessageLayout><h1>Something went wrong</h1></MessageLayout>
  }

  if (data == null) {
    return <Suspense><NotFoundPage /></Suspense>
  }

  return (
    <GlobalLayout newTitle={userName as string}>
      <Sheet variant='outlined' sx={{ backgroundColor: 'var(--joy-palette-background-surface)', padding: '0px', maxWidth: '37.5em', margin: 'auto', borderRadius: '0.4em', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <UserHeader data={data?.data as IUser} />
        <UserMain />

      </Sheet>
    </GlobalLayout>
  )
}

export default User
