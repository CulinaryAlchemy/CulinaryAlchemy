import { Loading } from '@/components'
import { useGlobalAuth } from '@/hooks'
import { MessageLayout } from '@/layouts'
import { CFrontRoutes } from '@/routing'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const AuthGuard = () => {
  const { pathname } = useLocation()

  const { isAuth, isLoading } = useGlobalAuth()

  if (isLoading) {
    return <MessageLayout><Loading size='lg' /></MessageLayout>
  }

  if (isAuth && Object.values(CFrontRoutes.Static.auth).includes(pathname)) {
    return <Navigate to={CFrontRoutes.Static.home} />
  }

  if (isAuth) {
    return <Outlet />
  }

  const isAAuthRote = Object.values({ ...CFrontRoutes.Static.auth }).includes(pathname)

  if (!isAuth && (isAAuthRote)) {
    return <Outlet />
  }


  return <Navigate to={CFrontRoutes.Static.auth.login} />
}
