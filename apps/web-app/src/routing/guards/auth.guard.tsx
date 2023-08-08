import { useAuthContext } from '@/context'
import { frontRoutes } from '@/routing'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const AuthGuard = () => {
  const { pathname } = useLocation()

  const { isAuth, isLoading } = useAuthContext()

  if (isLoading) {
    return <h1>Loading </h1>
  }

  if (isAuth && Object.values(frontRoutes.Static.auth).includes(pathname)) {
    return <Navigate to={frontRoutes.Static.index} />
  }

  if (isAuth) {
    return <Outlet />
  }

  if (!isAuth && Object.values(frontRoutes.Static.auth).includes(pathname)) {
    return <Outlet />
  }


  return <Navigate to={frontRoutes.Static.auth.login} />
}
