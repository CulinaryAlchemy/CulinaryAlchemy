import { Loading } from '@/components'
import { useTranslation } from '@/hooks'
import { DefaultLayout, GlobalLayout, MessageLayout } from '@/layouts'
import { type IUser, type IUserApiResponse } from '@/models/LOGIC'
import { Suspense, lazy } from 'react'
import { UserHeader, UserMain } from './components'
import { useUser } from './hooks/'

const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFound'))

const User = () => {
  const { t } = useTranslation()
  const { userName, userData, isLoading, error, isUserProfileOwner } = useUser()

  if (isLoading) {
    return (
      <MessageLayout>
        <Loading size="lg" />
      </MessageLayout>
    )
  }

  if (error != null && error.response == null) {
    return (
      <MessageLayout>
        <h1>{t('something went wrong')}</h1>
      </MessageLayout>
    )
  }

  if (userData.data == null) {
    return (
      <Suspense>
        <NotFoundPage />
      </Suspense>
    )
  }

  return (
    <GlobalLayout newTitle={userName as string}>
      <DefaultLayout>
        <UserHeader
          data={userData?.data as IUser}
          isOwner={isUserProfileOwner}
        />
        <UserMain recipesIds={(userData?.data as IUserApiResponse)?.recipes} />
      </DefaultLayout>
    </GlobalLayout>
  )
}

export default User
